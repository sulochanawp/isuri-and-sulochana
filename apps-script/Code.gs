// ============================================================
//  Wedding RSVP — Google Apps Script Backend
// ============================================================

var SPREADSHEET_ID = '1DdFnrl2yXZV8RTpEbNCYljYdiOnRc_nfMziKPDfwFhA';
var GUESTS_SHEET   = 'Guests';

// ── Column layout (1-indexed for getRange, 0-indexed for array) ─
// A(1)  Code
// B(2)  Name
// C(3)  Email
// D(4)  Mobile1
// E(5)  Mobile2
// F(6)  InvitationURL      ← personal RSVP link (auto or manually set)
// G(7)  AllowedAdults      ← you fill: your estimated / max adults
// H(8)  AllowedChildren    ← you fill: your estimated / max children (0 if none)
// I(9)  Attending          ← PENDING | YES | NO
// J(10) AttendingAdults    ← latest confirmed adult count from guest
// K(11) AttendingChildren  ← latest confirmed child count from guest
// L(12) Dietary
// M(13) Table              ← you fill
// N(14) Message
// O(15) SubmittedAt        ← timestamp of latest submission (always overwritten)

// ── Entry points ─────────────────────────────────────────────

function doGet(e) {
  try {
    var action = e.parameter.action;
    if (action === 'getGuest')        return handleGetGuest(e.parameter.code);
    if (action === 'submitRSVP')      return handleSubmitRSVP(e.parameter);
    if (action === 'getThankYouPhoto') return handleGetThankYouPhoto(e.parameter.folderId);
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
      var attending = String(row[8]).toUpperCase().trim();
      var isSubmitted = attending === 'YES' || attending === 'NO';
      return respond({
        success: true,
        guest: {
          code:              row[0],
          name:              row[1],
          email:             row[2]  || '',
          mobile1:           row[3]  || '',
          mobile2:           row[4]  || '',
          invitationUrl:     row[5]  || '',
          allowedAdults:     Number(row[6])  || 1,
          allowedChildren:   Number(row[7])  || 0,
          attending:         attending        || 'PENDING',
          attendingAdults:   Number(row[9])  || 0,
          attendingChildren: Number(row[10]) || 0,
          dietary:           row[11] || '',
          table:             row[12] || '',
          message:           row[13] || '',
          submittedAt:       row[14] || '',
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
      var rowNum      = i + 1;
      var isAttending = attending === 'YES';

      sheet.getRange(rowNum, 9).setValue(isAttending ? 'YES' : 'NO'); // I  Attending
      sheet.getRange(rowNum, 10).setValue(isAttending ? adults    : 0); // J  AttendingAdults
      sheet.getRange(rowNum, 11).setValue(isAttending ? children : 0); // K  AttendingChildren
      sheet.getRange(rowNum, 12).setValue(dietary);                    // L  Dietary
      sheet.getRange(rowNum, 14).setValue(message);                    // N  Message
      sheet.getRange(rowNum, 15).setValue(now);                        // O  SubmittedAt

      SpreadsheetApp.flush();

      return respond({
        success:   true,
        name:      data[i][1],
        table:     data[i][12] || '',
        attending: isAttending ? 'YES' : 'NO',
        adults:    isAttending ? adults   : 0,
        children:  isAttending ? children : 0,
      });
    }
  }

  return respond({ error: 'Guest not found' });
}

function handleGetThankYouPhoto(folderId) {
  if (!folderId) return respond({ error: 'No folder ID provided' });
  var folder = DriveApp.getFolderById(folderId);
  var files   = folder.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    var mime = file.getMimeType();
    if (mime.indexOf('image/') === 0) {
      return respond({
        success: true,
        fileId:  file.getId(),
        url:     'https://drive.google.com/uc?id=' + file.getId() + '&export=view',
      });
    }
  }
  return respond({ error: 'No image found in folder' });
}

// ── Helper ────────────────────────────────────────────────────

function respond(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
