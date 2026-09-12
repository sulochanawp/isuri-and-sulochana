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
// F(6)  InvitationURL
// G(7)  AllowedAdults
// H(8)  AllowedChildren
// I(9)  Attending          ← PENDING | YES | NO
// J(10) AttendingAdults
// K(11) AttendingChildren
// L(12) Dietary
// M(13) Table
// N(14) Message
// O(15) SubmittedAt
// P(16) Side               ← you fill: Groom | Bride (used to disambiguate name search)

// ── Entry points ─────────────────────────────────────────────

function doGet(e) {
  try {
    var action = e.parameter.action;
    if (action === 'getGuest')         return handleGetGuest(e.parameter.code);
    if (action === 'searchGuests')     return handleSearchGuests(e.parameter.q);
    if (action === 'submitRSVP')       return handleSubmitRSVP(e.parameter);
    if (action === 'getThankYouPhoto') return handleGetThankYouPhoto(e.parameter.folderId);
    if (action === 'getUploadUrl')     return handleGetUploadUrl(e.parameter);
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
      var attending   = String(row[8]).toUpperCase().trim();
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
          side:              row[15] || '',
          alreadySubmitted:  isSubmitted,
        }
      });
    }
  }

  return respond({ error: 'Guest not found. Please check your invitation code.' });
}

// Search guests by name — returns a short list of matches so the guest can
// pick the correct person from a dropdown. Side is included to disambiguate
// guests who share the same/similar name across the groom and bride sides.
function handleSearchGuests(q) {
  var query = String(q || '').toLowerCase().trim();
  if (query.length < 2) return respond({ success: true, guests: [] });

  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(GUESTS_SHEET);
  if (!sheet) return respond({ error: 'Guests sheet not found' });

  var data = sheet.getDataRange().getValues();
  var matches = [];

  for (var i = 1; i < data.length; i++) {
    var row  = data[i];
    var name = String(row[1] || '').trim();
    if (!name) continue;
    if (name.toLowerCase().indexOf(query) !== -1) {
      matches.push({
        code: row[0],
        name: name,
        side: row[15] || '',
      });
      if (matches.length >= 15) break;
    }
  }

  return respond({ success: true, guests: matches });
}

function handleSubmitRSVP(params) {
  var code      = params.code;
  var attending = params.attending;
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

      sheet.getRange(rowNum, 9).setValue(isAttending ? 'YES' : 'NO');
      sheet.getRange(rowNum, 10).setValue(isAttending ? adults   : 0);
      sheet.getRange(rowNum, 11).setValue(isAttending ? children : 0);
      sheet.getRange(rowNum, 12).setValue(dietary);
      sheet.getRange(rowNum, 14).setValue(message);
      sheet.getRange(rowNum, 15).setValue(now);

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
  var files  = folder.getFiles();
  while (files.hasNext()) {
    var file = files.next();
    if (file.getMimeType().indexOf('image/') === 0) {
      return respond({
        success: true,
        fileId:  file.getId(),
        url:     'https://drive.google.com/uc?id=' + file.getId() + '&export=view',
      });
    }
  }
  return respond({ error: 'No image found in folder' });
}

function handleGetUploadUrl(params) {
  var folderId = params.folderId;
  var filename = params.filename;
  var mimeType = params.mimeType || 'application/octet-stream';
  var fileSize = params.fileSize;

  if (!folderId) return respond({ error: 'No folder ID provided' });
  if (!filename) return respond({ error: 'No filename provided' });

  var token    = ScriptApp.getOAuthToken();
  var metadata = { name: filename, parents: [folderId] };

  var headers = {
    'Authorization':         'Bearer ' + token,
    'Content-Type':          'application/json; charset=UTF-8',
    'X-Upload-Content-Type': mimeType,
    'Origin':                'https://sulochanawp.github.io',
  };
  if (fileSize) headers['X-Upload-Content-Length'] = fileSize;

  var response = UrlFetchApp.fetch(
    'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable',
    {
      method:             'POST',
      headers:            headers,
      payload:            JSON.stringify(metadata),
      muteHttpExceptions: true,
    }
  );

  var uploadUrl = response.getHeaders()['Location'];
  if (!uploadUrl) return respond({ error: 'Could not get upload URL from Drive' });

  return respond({ success: true, uploadUrl: uploadUrl });
}

// ── Helper ────────────────────────────────────────────────────

function respond(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function authorizeUpload() {
  ScriptApp.requireScopes(ScriptApp.AuthMode.FULL, [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/script.external_request'
  ]);

  console.log('Required permissions granted.');
}
