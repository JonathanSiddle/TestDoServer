import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { TodoProjectListViewComponent } from './../../components/todo-project-list-view/todo-project-list-view.component';
import { ProjectService } from './../../../shared/services/projects.service';
import { ToDoProject } from '../../../shared/models/todoProject';

@Component({
  selector: 'app-todo-project-list',
  templateUrl: './todo-project-list.component.html',
  styleUrls: ['./todo-project-list.component.css']
})
export class TodoProjectListComponent implements OnInit {

  @ViewChild(TodoProjectListViewComponent) projectListView: TodoProjectListViewComponent;
  public projects: ToDoProject[] = [];

  constructor(public projectService: ProjectService) {
  }

  ngOnInit() {
    // this.projects$ = this.projectService.getAll();
    console.log(`Getting projects`);
    this.projectService.getAll().subscribe(
      returnedProjects => {
        // console.log('Got projects');
        this.projects = returnedProjects;
        console.log(`Got projects`);
        console.dir(this.projects);
      },
      error => {
        // console.log('error:' + error);
      }
    );
  }

  addedNewProject($event: string) {
    console.log(`Starting to add new project`);
    const newProj = new ToDoProject($event, 'Jonathan');
    console.log(newProj);
    // this.addedProject$ = this.projectService.create(new ToDoProject(addIndex, event, 'Jonathan'));
    this.projectService.create(newProj).subscribe(
      returnedProjects => {
        console.log('Got projects');
        console.dir(returnedProjects);
        this.projects.push(returnedProjects);
        this.projectListView.refreshData();
      },
      error => {
        console.log(`Hit error block`);
        console.dir(error);
      }
    );
  }

  editedProject($event: ToDoProject) {
    console.log(`Starting to send edited project`);
    this.projectService.update($event, $event.id).subscribe(
      editedProject => {
        console.log(`Got editied projects`);
        const proj = this.projects.find(p => p.id.toString() === $event.id.toString());
        proj.name = editedProject.name;
        proj.owner = editedProject.owner;
        this.projectListView.refreshData();
      },
      error => {
      }
    );
  }

  deletedProject($event: number) {
    this.projectService.delete($event).subscribe(
      deletedProject => {
        const dpId = this.projects.findIndex(p => p.id.toString() === $event.toString());
        console.log('deleted index: ' + dpId);
        if (dpId > -1) {
          this.projects.splice(dpId, 1);
        }
        this.projectListView.refreshData();
      },
      error => {
      }
    );
  }
}
