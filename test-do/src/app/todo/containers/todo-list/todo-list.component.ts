import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewChecked, AfterViewInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs';

import { ToDoItem } from './../../../shared/models/todoItem';
import { ProjectListsService } from '../../../shared/services/projectLists.service';
import { ToDoList } from '../../../shared/models/todoList';
import { ToDoItemService } from 'src/app/shared/services/toDoItem.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public projectId: number;
  public todoListId: number;
  public todoListToDisplay: ToDoList;

  constructor(public projectListsService: ProjectListsService,
              private activatedroute: ActivatedRoute,
              public toDoItemService: ToDoItemService) { }

  ngOnInit() {
    console.log(`Getting ToDoList`);
    this.projectId = this.activatedroute.snapshot.params['id1'];
    this.todoListId = this.activatedroute.snapshot.params['id2'];
    this.projectListsService.getOne(this.todoListId).subscribe(
      returnedToDoList => {
        console.log(`Got ToDoList`);
        console.dir(returnedToDoList);
        this.todoListToDisplay = returnedToDoList;
      },
      error => {
        console.log('Hit to do list error block with error: ');
        console.dir(error);
      }
    );
  }

  addedNewItem($event: ToDoItem) {
    this.toDoItemService.create($event).subscribe(
      item => {
        console.log('Saved data!');
        this.todoListToDisplay.items.push(item);
      },
      error => {
        console.log('Error saving item');
      }
    );
  }

  editedItem($event: ToDoItem) {
    const editedItem = this.todoListToDisplay.items.find(i => i.id.toString() === $event.id.toString());
    this.toDoItemService.update($event, $event.id).subscribe(
      item => {
        editedItem.name = item.name;
        editedItem.complete = item.complete;
      },
      error => {
        console.log('Error updating item');
      }
    );
  }

  deleteItem($event: number) {
    const deletedItem = this.todoListToDisplay.items.findIndex(i => i.id.toString() === $event.toString());
    this.toDoItemService.delete($event).subscribe(
      item => {
        console.log('Deleted item');
        this.todoListToDisplay.items.splice(deletedItem, 1);
      },
      error => {
        console.log('Error deleting item');
      }
    );
  }
}
