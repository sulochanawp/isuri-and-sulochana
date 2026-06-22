// ============================================================
//  Wedding RSVP — Google Apps Script Backend
// ============================================================

var SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
var GUESTS_SHEET   = 'Guests';

// ── Column layout (1-indexed for getRange, 0-indexed for array) ─
// A(1)  Code
// B(2)  Name
// C(3)  Email
// D(4)  Mobile1
// E(5)  Mobile2
// F(6)  AllowedAdults      ← you fill: max adults on invitation
// G(7)  AllowedChildren    ← you fill: max children (0 if none)
// H(8)  Attending          ← PENDING | YES | NO
// I(9)  AttendingAdults    ← ORIGINAL first-submission adult count
// J(10) AttendingChildren  ← ORIGINAL first-submission child count
// K(11) Dietary
// L(12) Table              ← you fill
// M(13) Message
// N(14) SubmittedAt        ← timestamp of FIRST submission (never overwritten)
// O(15) UpdatedAdults      ← latest updated adult count (blank until first update)
// P(16) UpdatedChildren    ← latest updated child count
// Q(17) LastUpdatedAt      ← timestamp of most recent change

// ── Entry points ─────────────────────────────────────────────

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

// ── Handlers ──────────────────────────────────────────────────

function handleGetGuest(code) {
  if (!code) return respond({ error: 'No code provided' });

  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(GUESTS_SHEET);
  if (!sheet) return respond({ error: 'Guests sheet not found' });

  var data = sheet.getDataRange().getValues();

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (String(row[0]).toUpperCase().trim() === code.toUpperCase().trim()) {
      var attending = String(row[7]).toUpperCase().trim();
      var isSubmitted = attending === 'YES' || attending === 'NO';
      return respond({
        success: true,
        guest: {
          code:              row[0],
          name:              row[1],
          email:             row[2]  || '',
          mobile1:           row[3]  || '',
          mobile2:           row[4]  || '',
          allowedAdults:     Number(row[5])  || 1,
          allowedChildren:   Number(row[6])  || 0,
          attending:         attending        || 'PENDING',
          // Original counts from first submission
          attendingAdults:   Number(row[8])  || 0,
          attendingChildren: Number(row[9])  || 0,
          dietary:           row[10] || '',
          table:             row[11] || '',
          message:           row[12] || '',
          submittedAt:       row[13] || '',
          // Latest update counts (blank if never updated)
          updatedAdults:     row[14] !== '' ? Number(row[14]) : null,
          updatedChildren:   row[15] !== '' ? Number(row[15]) : null,
          lastUpdatedAt:     row[16] || '',
          alreadySubmitted:  isSubmitted,
        }
      });
    }
  }

  return respond({ error: 'Guest not found. Please check your invitation code.' });
}

function handleSubmitRSVP(params) {
  var code      = params.code;
  var attending = params.attending;            // YES | NO
  var adults    = parseInt(params.adults)   || 0;
  var children  = parseInt(params.children) || 0;
  var dietary   = params.dietary  || '';
  var message   = params.message  || '';

  if (!code) return respond({ error: 'No code provided' });

  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(GUESTS_SHEET);
  if (!sheet) return respond({ error: 'Guests sheet not found' });

  var data = sheet.getDataRange().getValues();
  var now  = new Date().toISOString();

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]).toUpperCase().trim() === code.toUpperCase().trim()) {
      var rowNum         = i + 1;
      var isAttending    = attending === 'YES';
      var currentStatus  = String(data[i][7]).toUpperCase().trim();
      var isFirstSubmit  = currentStatus === 'PENDING' || currentStatus === '';

      // Always update: attending status, dietary, message
      sheet.getRange(rowNum, 8).setValue(isAttending ? 'YES' : 'NO'); // H
      sheet.getRange(rowNum, 11).setValue(dietary);                    // K
      sheet.getRange(rowNum, 13).setValue(message);                    // M

      if (isFirstSubmit) {
        // First submission — write to original columns I, J, N
        sheet.getRange(rowNum, 9).setValue(isAttending ? adults    : 0); // I AttendingAdults
        sheet.getRange(rowNum, 10).setValue(isAttending ? children : 0); // J AttendingChildren
        sheet.getRange(rowNum, 14).setValue(now);                        // N SubmittedAt
      } else {
        // Update — write new counts to O, P, Q (original I/J/N preserved)
        sheet.getRange(rowNum, 15).setValue(isAttending ? adults    : 0); // O UpdatedAdults
        sheet.getRange(rowNum, 16).setValue(isAttending ? children : 0);  // P UpdatedChildren
        sheet.getRange(rowNum, 17).setValue(now);                          // Q LastUpdatedAt
      }

      SpreadsheetApp.flush();

      return respond({
        success:    true,
        name:       data[i][1],
        table:      data[i][11] || '',
        attending:  isAttending ? 'YES' : 'NO',
        isUpdate:   !isFirstSubmit,
        adults:     isAttending ? adults    : 0,
        children:   isAttending ? children : 0,
      });
    }
  }

  return respond({ error: 'Guest not found' });
}

// ── Helper ────────────────────────────────────────────────────

function respond(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
