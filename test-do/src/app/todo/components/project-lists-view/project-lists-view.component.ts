import { MatDialog, MatTable } from '@angular/material';
import { Component, OnInit, Input, EventEmitter, ViewChild, Output } from '@angular/core';

import { ToDoList } from './../../../shared/models/todoList';
import { ProjectDialogData } from 'src/app/shared/dialogs/new-project-dialog/projectDialogData';
import { NewProjectDialogComponent } from 'src/app/shared/dialogs/new-project-dialog/new-project-dialog.component';
import { YesNoDialogComponent } from 'src/app/shared/dialogs/yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: 'app-project-lists-view',
  templateUrl: './project-lists-view.component.html',
  styleUrls: ['./project-lists-view.component.css']
})
export class ProjectListsViewComponent implements OnInit {

  @ViewChild(MatTable) matTable: MatTable<ToDoList[]>;
  @Input() public projectId: number;
  @Input() projectLists: ToDoList[];
  public listCount: number;
  public displayedColumns = ['Name', 'Owner', 'Edit'];

  @Output() public addedNewList = new EventEmitter<ToDoList>()
  @Output() public editedList = new EventEmitter<ToDoList>()
  @Output() public deletedList = new EventEmitter<number>()

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    if (this.projectLists) {
      this.listCount = this.projectLists.length;
    }
  }

  refreshData() {
    console.log('called refresh data');
    this.matTable.renderRows();
  }

  clickedDeleteList(listId: number) {
    console.log('CLicked delete project: ' + listId);

    const proj = this.projectLists.find(p => p.id.toString() === listId.toString());
    const message = 'Are you sure you want to delete ' + proj.name  + ', this can not be undone?';

    this.dialog.open(YesNoDialogComponent,
      {data: message})
    .afterClosed().subscribe(
      returnData  => {
        if (returnData) {
          console.log('clicked yes!');
          this.raiseDeleteListEvent(listId);
        } else {
        }
      }
    );
  }

  clickedAddNewList() {
    const setData = new ProjectDialogData(this.projectLists.map(p => p.name), '', false);

    this.dialog.open(NewProjectDialogComponent, {data: setData}).afterClosed().subscribe(
      data  => {
        const returnData = data as ProjectDialogData;
        console.log('got data back from dialog');
        if (returnData.projectName != null) {
          // create a uniqueId using projectId and list count
          const newList = new ToDoList(returnData.projectName, 'Jonathan', +this.projectId);
          console.dir(newList);
          this.raiseAddListEvent(newList);
        }
      }
    );
  }

  clickedEditList(listId: number) {
    const eList = this.projectLists.find(p => p.id.toString() === listId.toString());
    const setData = new ProjectDialogData(this.projectLists.map(p => p.name), eList.name, true);

    this.dialog.open(NewProjectDialogComponent, {data: setData}).afterClosed().subscribe(
      data => {
        if (data != null) {
          const returnData = data as ProjectDialogData;
          if (returnData.projectName != null) {
            const updateProj = new ToDoList(
              returnData.projectName,
              eList.owner,
              eList.projectId,
              eList.id);
            // console.log('Rasing edit events');
            this.raiseEditListEvent(updateProj);
          }
        }
      }
    );
  }

  raiseAddListEvent(list: ToDoList) {
    this.addedNewList.emit(list);
  }

  raiseEditListEvent(list: ToDoList) {
    this.editedList.emit(list);
  }

  raiseDeleteListEvent(id: number) {
    this.deletedList.emit(id);
  }
}
