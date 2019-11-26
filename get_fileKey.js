/* foam storage app's Get FileKey js
 * Click on button when creating or editing a record
 * 1. Determine the fileKey of the attached file
 * 2. Paste the fileKey into the text filed [FileKey_Here]
*/

/*
 * Create a Kintone App with the following fields: 
 *  * | ----------- | ------------ |
 *  * | Field Type  | Field Code   |
 *  * | ----------- | ------------ |
 *  * | Text        | File_Name    |
 *  * | Text        | FileKey_Here |
 *  * | Attachment  | File_Name    |
 *  * | Blank Space | mySpace      |
 
 
 * Attach the following Kintone UI Component file links in addition to this JavaScript file
 * * * JS  --> 'https://dl.dropbox.com/s/xsfsic0iaqhsrrb/kintone-ui-component.min.js?dl=1'
 * * * CSS --> 'https://dl.dropbox.com/s/x9a6567u6ixf6o7/kintone-ui-component.min.css?dl=1'
*/

const Get_FileKey = (event) => {
  const Data_Obj = event.record.Attachment.value;
  const file_FileKey = Data_Obj['0']['fileKey'];
  const file_Name = Data_Obj['0']['name'];

  // Test if there is only one attached file in the record
  if (Data_Obj.length > 1) {
    alert(
      `Error: There are more than one object!
      \n\n
      Only ${file_Name}'s fileKey will be produced.`
      );
  }
  const record_writing = kintone.app.record.get();
  record_writing['record']['FileKey_Here']['value'] = file_FileKey;
  let temp = record_writing['record']['File_Name']['value'];

  // If the File Name field is empty, then insert the Attached File's name
  if (record_writing['record']['File_Name']['value'] == undefined) {
    record_writing['record']['File_Name']['value'] = file_Name;
  }

  kintone.app.record.set(record_writing);
};

(function() {
  'use strict';
  let viewArray = [
    'app.record.edit.show',
    'app.record.create.show',
    // 'app.record.detail.show'
  ];
  kintone.events.on( viewArray, (event) => {
    // Prevent Button Duplication Bug
    if (document.getElementById('myButtonID') != null){ return; }

    // Setting up the button
    const myButton = new kintoneUIComponent.Button({
      text: 'Get FileKey',
      type: 'normal'
    });

    myButton.element.id = 'myButtonID';

    myButton.on('click', (buttonClicked) => {
      Get_FileKey(event);
    });

    // Retrieve the header menu space element & set the button there
    kintone.app.record.getSpaceElement('mySpace').appendChild(myButton.render());
  });
})();

/*
 Sample Response
  [
    {
      "fileKey": "20191126000042A792011D5DEE44F98EEC72F2A8C78A1B331",
      "name": "Test.js",
      "contentType": "application/javascript",
      "size": "12345"
    }
  ]
*/
