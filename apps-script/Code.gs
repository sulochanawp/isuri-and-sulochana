// ============================================================
//  Wedding RSVP — Google Apps Script Backend
//  Paste this entire file into your Apps Script project.
// ============================================================

var SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
var GUESTS_SHEET   = 'Guests';

// ── Google Sheets column layout (1-indexed for getRange) ────
// A(1)  Code
// B(2)  Name
// C(3)  Email              ← optional
// D(4)  Mobile1            ← primary WhatsApp / mobile
// E(5)  Mobile2            ← secondary number (optional)
// F(6)  AllowedAdults      ← max adults on this invitation (includes main guest)
// G(7)  AllowedChildren    ← max children on this invitation (0 if none)
// H(8)  Attending          ← PENDING | YES | NO
// I(9)  AttendingAdults    ← confirmed adult count
// J(10) AttendingChildren  ← confirmed child count
// K(11) Dietary            ← dietary requirements
// L(12) Table              ← table number/name (you fill this)
// M(13) Message            ← message to couple
// N(14) SubmittedAt        ← ISO timestamp

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
      var attending = String(row[7]).toUpperCase().trim();
      return respond({
        success: true,
        guest: {
          code:              row[0],
          name:              row[1],
          email:             row[2]  || '',
          mobile1:           row[3]  || '',
          mobile2:           row[4]  || '',
          allowedAdults:     Number(row[5]) || 1,
          allowedChildren:   Number(row[6]) || 0,
          attending:         attending || 'PENDING',
          attendingAdults:   Number(row[8]) || 0,
          attendingChildren: Number(row[9]) || 0,
          dietary:           row[10] || '',
          table:             row[11] || '',
          message:           row[12] || '',
          submittedAt:       row[13] || '',
          alreadySubmitted:  attending === 'YES' || attending === 'NO',
        }
      });
    }
  }

  return respond({ error: 'Guest not found. Please check your invitation code.' });
}

function handleSubmitRSVP(params) {
  var code     = params.code;
  var attending = params.attending;           // YES | NO
  var adults   = parseInt(params.adults)  || 0;
  var children = parseInt(params.children) || 0;
  var dietary  = params.dietary  || '';
  var message  = params.message  || '';

  if (!code) return respond({ error: 'No code provided' });

  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(GUESTS_SHEET);
  if (!sheet) return respond({ error: 'Guests sheet not found' });

  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]).toUpperCase().trim() === code.toUpperCase().trim()) {
      var rowNum      = i + 1;
      var isAttending = attending === 'YES';

      sheet.getRange(rowNum, 8).setValue(isAttending ? 'YES' : 'NO');   // H Attending
      sheet.getRange(rowNum, 9).setValue(isAttending ? adults   : 0);   // I AttendingAdults
      sheet.getRange(rowNum, 10).setValue(isAttending ? children : 0);  // J AttendingChildren
      sheet.getRange(rowNum, 11).setValue(dietary);                     // K Dietary
      sheet.getRange(rowNum, 13).setValue(message);                     // M Message
      sheet.getRange(rowNum, 14).setValue(new Date().toISOString());    // N SubmittedAt

      SpreadsheetApp.flush();

      return respond({
        success:           true,
        name:              data[i][1],
        table:             data[i][11] || '',   // L Table
        attending:         isAttending ? 'YES' : 'NO',
        attendingAdults:   isAttending ? adults   : 0,
        attendingChildren: isAttending ? children : 0,
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
