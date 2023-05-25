import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.css']
})
export class TableFilterComponent implements OnInit {
  @Input()  item:any;
  @Input()  item1:any;
  @Output() public EditFilterItem =    new EventEmitter();

  @Output() public DeleteFilterItem = new EventEmitter();
  constructor() { }

  ngOnInit() {


  }
  public editFilterClick() {
    this.EditFilterItem.emit(this.item1);
  }
  public deleteFilterClick()
  {
    this.DeleteFilterItem.emit({itemname: this.item, Id: this.item1.fieldId});
  }
}
