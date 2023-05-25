import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormGroupName } from '@angular/forms';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { formatDate } from '@angular/common';
import { LoginconfigService } from 'src/app/services/loginconfig.service';
import { BuildercreateServiceService } from 'src/app/services/buildercreate-service.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-view-multichild',
  templateUrl: './view-multichild.component.html',
  styleUrls: ['./view-multichild.component.css']
})
export class ViewMultichildComponent implements OnInit {
  @Input() item: any;
  @Input() child: any;
  @Input() childForm: FormGroup;
  @Input() frmGrpIndex: any;
  @Input() submitted: any;

  @Output() public cascadeCondn = new EventEmitter();
  url: any;
  fileExtension = ".jpg";
  fileExtensionError = false;
  photoName: any;
  filesize: any;
  Attachment: any;
  splitValue: any;
  File: any;
  isDrawing = false;
  ismeridian: boolean = false;
  readonly = true;
  Starttime = new Date();
  Endtime = new Date();
  public signaturePadOptions: Object = {

    'minWidth': 2,
    'canvasWidth': 0,
    'canvasHeight': 0,
    'penColor': "#1d1d85",
  };
  @ViewChild('signatureCanvas', { static: true }) signaturePad: SignaturePad;
  constructor(private Builderservice: BuildercreateServiceService, private loginconfigservice: LoginconfigService) { }

  ngOnInit() {
  }

  drawchildComplete(signatureCanvas, columnID, formname) {
    //let formname = this.form.get(divId)["controls"][Index]
    formname.get(columnID).setValue(signatureCanvas.toDataURL())
    this.isDrawing = false;

  }
  drawStart() {
    this.isDrawing = true;

  }
  clearPad(signatureCanvas) {
    signatureCanvas.clear();
  }
  ondatechange(val, columnid, itemvalue) {


    val = formatDate(val.toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
    this.childForm.get(columnid).setValue(val);
    this.OnchangeFn(val, columnid, 0, itemvalue);

  }
  DownLoadFiles(fieldname, fieldvalue) {

    fieldname = fieldname.replace(/[\s]/g, '');
    let fileName = fieldvalue;
    //file type extension
    let checkFileType = fileName.split('.').pop();

    let thefile: any;
    let now = formatDate(new Date().toLocaleDateString(), 'yyyy-MM-dd', 'en-US');
    let filecheck = fieldname + now + "." + checkFileType;
    this.Builderservice.DownloadFile(fileName)
      .subscribe(
        (data) => {

          thefile = new Blob([data], { type: "application/octet-stream" }),
            saveAs(thefile, filecheck);

        },
        err => {

          alert("Server error while downloading file.");
        }
      );


  }
  ontimechange(val, fieldId, itemvalue) {

    let timevalue = val.getHours() + ":" + val.getMinutes()
    this.childForm.get(fieldId).setValue(timevalue);
    if (itemvalue != undefined && itemvalue.calculateValue) {
      this.OnchangeFn(val, fieldId, 0, itemvalue);
    }
  }
  OnchangeFn(val: string, fieldvalue, settingflag, itemvalue?, childform?, index?) {

    this.cascadeCondn.emit({ val, fieldvalue, settingflag, itemvalue, childform, index })

  }
  onSelectFile(event, fieldId, formname) {

    this.url = null;

    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      this.photoName = file.name;

      this.filesize = file.size;

      let now = new Date();
      this.Attachment = file.name;


      this.loginconfigservice.postFiles(this.Attachment, file).subscribe(
        (response) => {

          this.splitValue = response;
          let split = this.splitValue.split(',')
          if (split) {
            if (split.length > 0) {
              this.File = split[0];

              this.url = split[1];
              formname.get(fieldId).setValue(this.File);

            }
          }
        }
      );



    }
  }
}
