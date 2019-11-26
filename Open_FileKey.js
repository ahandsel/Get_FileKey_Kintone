// Open_FileKey.js
let Ask_Subdomain = window.prompt('Please input the FileKey:', 'cafe');
let Ask_FileKey = window.prompt('Please input the FileKey:');
let url = `https://${Ask_Subdomain}.kintone.com/k/v1/file.json?fileKey=${Ask_FileKey}`;
let backup = url;

var xhr = new XMLHttpRequest();
xhr.open('GET', url);
xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
xhr.responseType = 'blob';
xhr.onload = function() {
  if (xhr.status === 200) {
    // success
    var blob = new Blob([xhr.response]);
    var url = window.URL || window.webkitURL;
    var blobUrl = url.createObjectURL(blob);
    console.log(blobUrl);
    console.log(backup);
  } else {
    // error
    console.log(xhr.responseText);
  }
};
xhr.send();
/*
 * blobUrl = https://cafe.kintone.com/5eac86b5-930d-467f-a004-9499f5dde01f
 * backup = https://cafe.kintone.com/k/v1/file.json?fileKey=20191126062435FA0C8F01642446578BDE6B87AE75A4B1189
 *
 */
