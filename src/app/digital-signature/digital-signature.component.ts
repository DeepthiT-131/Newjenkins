import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { AutoComplete } from 'primeng/primeng';
import { AmazingTimePickerService } from 'amazing-time-picker';
@Component({
  selector: 'app-digital-signature',
  templateUrl: './digital-signature.component.html',
  styleUrls: ['./digital-signature.component.css']
})
export class DigitalSignatureComponent implements OnInit {

  @ViewChild(SignaturePad,{static:false}) signaturePad: SignaturePad;
  // @ViewChild('signCanvas', { static: false }) signaturePad : ElementRef;
  public selectedTime: string;
  public signaturePadOptions: Object = { 
    'minWidth': 1,
    'canvasWidth': 0,
    'canvasHeight': 0
  };

  constructor(private atp: AmazingTimePickerService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // this.signaturePad is now available
    let canvas = document.querySelector('canvas');
    this.signaturePad.set('minWidth', 1); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    this.signaturePad.set('canvasWidth', canvas.offsetWidth);
    this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  }
  onClearClick() {
    this.signaturePad.clear();
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
    
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    
  }

}
