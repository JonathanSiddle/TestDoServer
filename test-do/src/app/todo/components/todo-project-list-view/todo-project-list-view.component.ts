import { MatDialog, MatTable } from '@angular/material';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges, OnChanges} from '@angular/core';

import { ProjectDialogData } from './../../../shared/dialogs/new-project-dialog/projectDialogData';
import { NewProjectDialogComponent } from './../../../shared/dialogs/new-project-dialog/new-project-dialog.component';
import { ToDoProject } from '../../../shared/models/todoProject';
import { YesNoDialogComponent } from '../../../shared/dialogs/yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: 'app-todo-project-list-view',
  templateUrl: './todo-project-list-view.component.html',
  styleUrls: ['./todo-project-list-view.component.css']
})
export class TodoProjectListViewComponent implements OnInit {

  @ViewChild(MatTable) matTable: MatTable<ToDoProject>;
  @Input() public projects: Array<ToDoProject>;

  @Output() addedProject = new EventEmitter<string>();
  @Output() editProject = new EventEmitter<ToDoProject>();
  @Output() deleteProject = new EventEmitter<number>();
  public displayedColumns = ['Name', 'Owner', 'Edit'];

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  clickedAddNewProject() {
    // this.dialog.open(NewProjectDialogComponent, {data: {cProject: this.selectedProject}}).afterClosed().subscribe(
    const setData = new ProjectDialogData(this.projects.map(p => p.name), '', false);
    this.dialog.open(NewProjectDialogComponent, {data: setData}).afterClosed().subscribe(
      data  => {
        const returnData = data as ProjectDialogData;
        console.log('Got return value');
        console.log(returnData.projectName);
        if (returnData.projectName != null) {
          this.raiseAddedProjectEvent(returnData.projectName);
        }
      }
    );
  }

  clickedEditProject(projId: number) {
    const editProject = this.projects.find(p => p.id.toString() === projId.toString());
    const setData = new ProjectDialogData(this.projects.map(p => p.name), editProject.name, true);
    this.dialog.open(NewProjectDialogComponent, {data: setData}).afterClosed().subscribe(
      data => {
        if (data != null) {
          const returnData = data as ProjectDialogData;
          if (returnData.projectName != null) {
            const updateProj = new ToDoProject(
              returnData.projectName,
              editProject.owner,
              editProject.id);
            this.raiseEditProjectEvent(updateProj);
          }
        }
      }
    );
  }

  clickedDeleteProject(projId: number) {
    const proj = this.projects.find(p => p.id.toString() === projId.toString());
    const message = 'Are you sure you want to delete ' + proj.name  + ', this can not be undone?';

    console.log('CLicked delete project: ' + projId);
    this.dialog.open(YesNoDialogComponent,
      {data: message})
    .afterClosed().subscribe(
      returnData  => {
        if (returnData) {
          console.log('clicked yes!');
          this.raiseDeleteProjectEvent(projId);
        } else {
        }
      }
    );
  }

  refreshData() {
    console.log('called refresh data');
    this.matTable.renderRows();
  }

  raiseAddedProjectEvent(projName: string) {
    this.addedProject.emit(projName);
  }

  raiseEditProjectEvent(proj: ToDoProject) {
    this.editProject.emit(proj);
  }

  raiseDeleteProjectEvent(projId: number) {
    this.deleteProject.emit(projId);
  }
}
