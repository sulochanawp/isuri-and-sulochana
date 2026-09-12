// ============================================================
//  Wedding RSVP — Google Apps Script Backend
// ============================================================

var SPREADSHEET_ID = '1DdFnrl2yXZV8RTpEbNCYljYdiOnRc_nfMziKPDfwFhA';
var GUESTS_SHEET   = 'Guests';

// ── Columns are matched BY HEADER NAME (row 1), not by position ──
// This means you can reorder or move columns freely in the sheet — e.g. put
// "Side" in column C — without changing any code, as long as row 1 keeps these
// header labels. Matching ignores case, spaces and punctuation, so "Allowed
// Adults", "AllowedAdults" and "allowed_adults" are all equivalent.
//
//   Code               (required)  guest's unique code / ID
//   Name               (required)  guest's full name
//   Side                           Groom | Bride  (shown in name search)
//   Email
//   Mobile1
//   Mobile2
//   InvitationURL
//   AllowedAdults                  max adults the invitation allows
//   AllowedChildren                max children the invitation allows
//   Attending                      PENDING | YES | NO   (written on submit)
//   AttendingAdults                                     (written on submit)
//   AttendingChildren                                   (written on submit)
//   Dietary                                             (written on submit)
//   Table
//   Message                                             (written on submit)
//   SubmittedAt                                         (written on submit)

// ── Entry points ─────────────────────────────────────────────

function doGet(e) {
  try {
    var action = e.parameter.action;
    if (action === 'getGuest')         return handleGetGuest(e.parameter.code);
    if (action === 'searchGuests')     return handleSearchGuests(e.parameter.q);
    if (action === 'listGuests')       return handleListGuests();
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

// ── Column-mapping helpers (match columns by header name) ─────

// Normalize a header cell to a lookup key: lowercase alphanumerics only.
function normHeader(h) {
  return String(h == null ? '' : h).toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Build { normalizedHeader: columnIndex } from the sheet's first row.
function buildColMap(headerRow) {
  var map = {};
  for (var i = 0; i < headerRow.length; i++) {
    var key = normHeader(headerRow[i]);
    if (key && map[key] === undefined) map[key] = i;
  }
  return map;
}

// Read a field from a row by header key; '' if that column doesn't exist.
function cell(row, col, key) {
  return col[key] === undefined ? '' : row[col[key]];
}

// Write a value into a row's column by header key (no-op if column absent).
function writeCell(sheet, rowNum, col, key, value) {
  if (col[key] !== undefined) sheet.getRange(rowNum, col[key] + 1).setValue(value);
}

// ── Handlers ──────────────────────────────────────────────────

function handleGetGuest(code) {
  if (!code) return respond({ error: 'No code provided' });

  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(GUESTS_SHEET);
  if (!sheet) return respond({ error: 'Guests sheet not found' });

  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return respond({ error: 'Guest not found. Please check your invitation code.' });
  var col = buildColMap(data[0]);

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (String(cell(row, col, 'code')).toUpperCase().trim() === code.toUpperCase().trim()) {
      var attending   = String(cell(row, col, 'attending')).toUpperCase().trim();
      var isSubmitted = attending === 'YES' || attending === 'NO';
      return respond({
        success: true,
        guest: {
          code:              cell(row, col, 'code'),
          name:              cell(row, col, 'name'),
          email:             cell(row, col, 'email')         || '',
          mobile1:           cell(row, col, 'mobile1')       || '',
          mobile2:           cell(row, col, 'mobile2')       || '',
          invitationUrl:     cell(row, col, 'invitationurl') || '',
          allowedAdults:     Number(cell(row, col, 'allowedadults'))   || 1,
          allowedChildren:   Number(cell(row, col, 'allowedchildren')) || 0,
          attending:         attending || 'PENDING',
          attendingAdults:   Number(cell(row, col, 'attendingadults'))   || 0,
          attendingChildren: Number(cell(row, col, 'attendingchildren')) || 0,
          dietary:           cell(row, col, 'dietary')     || '',
          table:             cell(row, col, 'table')       || '',
          message:           cell(row, col, 'message')     || '',
          submittedAt:       cell(row, col, 'submittedat') || '',
          side:              cell(row, col, 'side')        || '',
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
  if (data.length < 2) return respond({ success: true, guests: [] });
  var col = buildColMap(data[0]);
  var matches = [];

  for (var i = 1; i < data.length; i++) {
    var row  = data[i];
    var name = String(cell(row, col, 'name') || '').trim();
    if (!name) continue;
    if (name.toLowerCase().indexOf(query) !== -1) {
      matches.push({
        code: cell(row, col, 'code'),
        name: name,
        side: cell(row, col, 'side') || '',
      });
      if (matches.length >= 15) break;
    }
  }

  return respond({ success: true, guests: matches });
}

// Return the whole guest list (name + side + code) in one call so the site can
// filter instantly in the browser as the guest types, instead of making a slow
// round-trip per keystroke. Cached briefly to keep repeat loads fast. If you add
// or rename guests in the sheet, changes appear within CACHE_TTL, or run
// clearGuestCache() to publish them immediately.
var GUEST_LIST_CACHE_KEY = 'guestList';
var CACHE_TTL            = 600; // seconds (10 min)

function handleListGuests() {
  var cache  = CacheService.getScriptCache();
  var cached = cache.get(GUEST_LIST_CACHE_KEY);
  if (cached) return respond({ success: true, guests: JSON.parse(cached), cached: true });

  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(GUESTS_SHEET);
  if (!sheet) return respond({ error: 'Guests sheet not found' });

  var data   = sheet.getDataRange().getValues();
  var guests = [];
  if (data.length >= 2) {
    var col = buildColMap(data[0]);
    for (var i = 1; i < data.length; i++) {
      var row  = data[i];
      var name = String(cell(row, col, 'name') || '').trim();
      if (!name) continue;
      guests.push({ code: cell(row, col, 'code'), name: name, side: cell(row, col, 'side') || '' });
    }
  }

  var json = JSON.stringify(guests);
  if (json.length < 100000) cache.put(GUEST_LIST_CACHE_KEY, json, CACHE_TTL);
  return respond({ success: true, guests: guests });
}

// Run this manually after editing the guest list to refresh the site instantly.
function clearGuestCache() {
  CacheService.getScriptCache().remove(GUEST_LIST_CACHE_KEY);
  console.log('Guest list cache cleared.');
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
  if (data.length < 2) return respond({ error: 'Guest not found' });
  var col = buildColMap(data[0]);
  var now = new Date().toISOString();

  for (var i = 1; i < data.length; i++) {
    if (String(cell(data[i], col, 'code')).toUpperCase().trim() === code.toUpperCase().trim()) {
      var rowNum      = i + 1;
      var isAttending = attending === 'YES';

      writeCell(sheet, rowNum, col, 'attending',         isAttending ? 'YES' : 'NO');
      writeCell(sheet, rowNum, col, 'attendingadults',   isAttending ? adults   : 0);
      writeCell(sheet, rowNum, col, 'attendingchildren', isAttending ? children : 0);
      writeCell(sheet, rowNum, col, 'dietary',           dietary);
      writeCell(sheet, rowNum, col, 'message',           message);
      writeCell(sheet, rowNum, col, 'submittedat',       now);

      SpreadsheetApp.flush();

      return respond({
        success:   true,
        name:      cell(data[i], col, 'name'),
        table:     cell(data[i], col, 'table') || '',
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
