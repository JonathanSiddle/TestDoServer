import { defer } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ToDoList } from './../../../shared/models/todoList';
import { existsInListValidator } from '../../../shared/validators/existsInListValidator';
import { ToDoItem } from '../../../shared/models/todoItem';

@Component({
  selector: 'app-todo-list-view',
  templateUrl: './todo-list-view.component.html',
  styleUrls: ['./todo-list-view.component.css']
})
export class TodoListViewComponent implements OnInit {

  @Input() public projectId: number;
  @Input() public toDoList: ToDoList;

  @Output() public addedItem = new EventEmitter<ToDoItem>();
  @Output() public editItem = new EventEmitter<ToDoItem>();
  @Output() public deleteItem = new EventEmitter<number>();

  public form = new FormGroup({
    'itemName': new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50)
    ]),
  });

  constructor() { }

  ngOnInit() {
    console.log(`Input to do list:`);
    console.dir(this.toDoList);
  }

  get itemName() {
    return this.form.get('itemName');
  }

  get isFormValid() {
    return this.itemName.dirty && this.itemName.valid && 
    (this.toDoList.items.filter(i => i.name === this.itemName.value).length === 0);
  }

  enterkeyPressed() {
    if (this.isFormValid) {
      this.clickedSave(null);
    }
  }

  clickedSave(item: ToDoItem) {
    if (item) {
      // create new item then update when
      // confirmed with server
      const newEditItem = new ToDoItem(
        item.name,
        item.complete,
        item.toDoListId,
        item.id);

        console.log('Raising edit event');
        this.raiseEditEvent(newEditItem);
    } else {
      const newItem = new ToDoItem(this.itemName.value, false, this.toDoList.id);

      console.log('Raising new event');
      this.raiseAddNewEvent(newItem);
    }

    this.itemName.reset();
  }

  clickedCheckBox(itemId: number) {
    const item = this.toDoList.items.find(i => i.id.toString() === itemId.toString());
    item.complete = !item.complete; // flip value
    this.clickedSave(item);
  }

  clickedCancelButton() {
    this.itemName.reset();
  }

  clickedEditItem(id: number) {
    const item = this.toDoList.items.find(i => i.id.toString() === id.toString());
  }

  clickedDeleteItem(itemId: number) {
    console.log('Clicked delete:' + itemId);
    this.raiseDeleteEvent(itemId);
  }

  raiseEditEvent(toDoItem: ToDoItem) {
    this.editItem.emit(toDoItem);
  }

  raiseAddNewEvent(toDoItem: ToDoItem) {
    this.addedItem.emit(toDoItem);
  }

  raiseDeleteEvent(itemId: number) {
    this.deleteItem.emit(itemId);
  }
}
