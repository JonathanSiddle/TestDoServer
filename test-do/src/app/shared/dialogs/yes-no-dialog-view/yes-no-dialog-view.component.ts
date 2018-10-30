import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-yes-no-dialog-view',
  templateUrl: './yes-no-dialog-view.component.html',
  styleUrls: ['./yes-no-dialog-view.component.css']
})
export class YesNoDialogViewComponent implements OnInit {

  @Input() public message = '';
  @Output() public result = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  clickedYes() {
    this.raiseEvent(true);
  }

  clickedNo() {
    this.raiseEvent(false);
  }

  raiseEvent(result: boolean){
    this.result.emit(result);
  }
}
