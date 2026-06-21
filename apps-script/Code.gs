// ============================================================
//  Wedding RSVP — Google Apps Script Backend
//  Paste this entire file into your Apps Script project.
// ============================================================

// STEP 1: Replace with your Google Sheet ID (from the sheet URL)
// URL format: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
var SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';

// Sheet names — must match exactly (case-sensitive)
var GUESTS_SHEET = 'Guests';

// ── Google Sheets column layout (1-indexed) ─────────────────
// A(1)  Code          — unique invite code, e.g. "ABC001"
// B(2)  Name          — guest display name
// C(3)  Email         — guest email (optional, for reference)
// D(4)  AllowedGuests — max number of seats on this invitation (default 1)
// E(5)  Attending     — PENDING | YES | NO
// F(6)  AttendingCount — actual number confirmed
// G(7)  Dietary       — dietary requirements
// H(8)  Table         — table number/name assigned by organiser
// I(9)  Message       — message to couple
// J(10) SubmittedAt   — ISO timestamp of submission

// ── Entry points ────────────────────────────────────────────

function doGet(e) {
  try {
    var action = e.parameter.action;
    if (action === 'getGuest')   return handleGetGuest(e.parameter.code);
    if (action === 'submitRSVP') return handleSubmitRSVP(e.parameter);
    return respond({ error: 'Unknown action' });
  } catch (err) {
    return respond({ error: err.message });
  }
}

// doPost is included for future use; frontend currently uses GET only
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    if (data.action === 'submitRSVP') return handleSubmitRSVP(data);
    return respond({ error: 'Unknown action' });
  } catch (err) {
    return respond({ error: err.message });
  }
}

// ── Handlers ─────────────────────────────────────────────────

function handleGetGuest(code) {
  if (!code) return respond({ error: 'No code provided' });

  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(GUESTS_SHEET);
  if (!sheet) return respond({ error: 'Guests sheet not found' });

  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (String(row[0]).toUpperCase().trim() === code.toUpperCase().trim()) {
      var attending = String(row[4]).toUpperCase().trim();
      return respond({
        success: true,
        guest: {
          code:            row[0],
          name:            row[1],
          email:           row[2],
          allowedGuests:   row[3] || 1,
          attending:       attending || 'PENDING',
          attendingCount:  row[5] || 0,
          dietary:         row[6] || '',
          table:           row[7] || '',
          message:         row[8] || '',
          submittedAt:     row[9] || '',
          alreadySubmitted: attending === 'YES' || attending === 'NO',
        }
      });
    }
  }

  return respond({ error: 'Guest not found. Please check your invitation code.' });
}

function handleSubmitRSVP(params) {
  var code      = params.code;
  var attending = params.attending;   // 'YES' or 'NO'
  var count     = params.count;
  var dietary   = params.dietary  || '';
  var message   = params.message  || '';

  if (!code) return respond({ error: 'No code provided' });

  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(GUESTS_SHEET);
  if (!sheet) return respond({ error: 'Guests sheet not found' });

  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]).toUpperCase().trim() === code.toUpperCase().trim()) {
      var rowNum = i + 1; // Sheets rows are 1-indexed
      var isAttending = attending === 'YES';

      sheet.getRange(rowNum, 5).setValue(isAttending ? 'YES' : 'NO');
      sheet.getRange(rowNum, 6).setValue(isAttending ? (parseInt(count) || 1) : 0);
      sheet.getRange(rowNum, 7).setValue(dietary);
      sheet.getRange(rowNum, 9).setValue(message);
      sheet.getRange(rowNum, 10).setValue(new Date().toISOString());

      SpreadsheetApp.flush();

      return respond({
        success:   true,
        name:      data[i][1],
        table:     data[i][7] || '',
        attending: isAttending ? 'YES' : 'NO',
      });
    }
  }

  return respond({ error: 'Guest not found' });
}

// ── Helper ───────────────────────────────────────────────────

function respond(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
