// ============================================================
//  Wedding RSVP — Google Apps Script Backend
//  Paste this entire file into your Apps Script project.
// ============================================================

// STEP 1: Replace with your Google Sheet ID (from the sheet URL)
var SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';

var GUESTS_SHEET = 'Guests';

// ── Google Sheets column layout (1-indexed) ─────────────────
// A(1)  Code
// B(2)  Name
// C(3)  Email            ← optional, leave blank if none
// D(4)  Mobile1          ← primary WhatsApp / mobile number
// E(5)  Mobile2          ← secondary number (optional)
// F(6)  AllowedGuests    ← max seats on this invitation
// G(7)  Attending        ← PENDING | YES | NO
// H(8)  AttendingCount   ← actual confirmed count
// I(9)  Dietary          ← dietary requirements
// J(10) Table            ← table number/name assigned by organiser
// K(11) Message          ← message to couple
// L(12) SubmittedAt      ← ISO timestamp

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
      var attending = String(row[6]).toUpperCase().trim();
      return respond({
        success: true,
        guest: {
          code:            row[0],
          name:            row[1],
          email:           row[2] || '',
          mobile1:         row[3] || '',
          mobile2:         row[4] || '',
          allowedGuests:   row[5] || 1,
          attending:       attending || 'PENDING',
          attendingCount:  row[7] || 0,
          dietary:         row[8] || '',
          table:           row[9] || '',
          message:         row[10] || '',
          submittedAt:     row[11] || '',
          alreadySubmitted: attending === 'YES' || attending === 'NO',
        }
      });
    }
  }

  return respond({ error: 'Guest not found. Please check your invitation code.' });
}

function handleSubmitRSVP(params) {
  var code      = params.code;
  var attending = params.attending;
  var count     = params.count;
  var dietary   = params.dietary  || '';
  var message   = params.message  || '';

  if (!code) return respond({ error: 'No code provided' });

  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(GUESTS_SHEET);
  if (!sheet) return respond({ error: 'Guests sheet not found' });

  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]).toUpperCase().trim() === code.toUpperCase().trim()) {
      var rowNum = i + 1;
      var isAttending = attending === 'YES';

      sheet.getRange(rowNum, 7).setValue(isAttending ? 'YES' : 'NO');   // G — Attending
      sheet.getRange(rowNum, 8).setValue(isAttending ? (parseInt(count) || 1) : 0); // H — AttendingCount
      sheet.getRange(rowNum, 9).setValue(dietary);                       // I — Dietary
      sheet.getRange(rowNum, 11).setValue(message);                      // K — Message
      sheet.getRange(rowNum, 12).setValue(new Date().toISOString());     // L — SubmittedAt

      SpreadsheetApp.flush();

      return respond({
        success:   true,
        name:      data[i][1],
        table:     data[i][9] || '',   // J — Table
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
