import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';



@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  @Input() item: any;
  @Input() item1: any;
  texteditor: string;
  // targetWidth :400;
  // targetHeight:400;
  
  @ViewChild(SignaturePad,{static:false}) signaturePad: SignaturePad;
  @Output() messageEvent = new EventEmitter<string>();
  private signaturePadOptions: Object = { 
    'minWidth': 1,
    'canvasWidth': 0,
    'canvasHeight': 0,
    //  'quality': 100,
     'penColor': "rgb(66, 133, 244)",
    // 'minWidth': 1,
    // 'canvasWidth': AutoComplete,
    // 'canvasHeight': AutoComplete
    // 'allowEdit' : true,
      // 'targetHeight':800,
      // 'targetwidth' :800,
  };

  @Output() public EditItem = new EventEmitter();

  @Output() public DeleteItem = new EventEmitter();

  @Output() public CalculateItem = new EventEmitter();

  @Output() public TriggerModal = new EventEmitter();

  @Output() public RuleEngine = new EventEmitter();
  constructor() { }

  ngOnInit() {
    

  }
  sendMessage() {
    this.messageEvent.emit(this.texteditor)
  }
  toggleValue(item) {
    item.selected = !item.selected;
  }
  public editClick() {
    this.EditItem.emit(this.item1);
  }
  public deleteClick() {
    this.DeleteItem.emit({ itemname: this.item, Id: this.item1.fieldId });
  }
  public CalculationClick() {
    this.CalculateItem.emit(this.item1);
  }
  public TriggerClick() {
    this.TriggerModal.emit(this.item1);
  }
  public RuleEngineClick() {
    this.RuleEngine.emit(this.item1);
  }


  onClearClick() {
    this.signaturePad.clear();
  }

  drawComplete() {
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    console.log('begin drawing');
  }
}
