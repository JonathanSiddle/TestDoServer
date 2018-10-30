import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { ProjectListsViewComponent } from './../../components/project-lists-view/project-lists-view.component';
import { ProjectListsService } from './../../../shared/services/projectLists.service';
import { ToDoList } from '../../../shared/models/todoList';
import { ProjectService } from '../../../shared/services/projects.service';

@Component({
  selector: 'app-project-lists',
  templateUrl: './project-lists.component.html',
  styleUrls: ['./project-lists.component.css']
})
export class ProjectListsComponent implements OnInit {

  @ViewChild(ProjectListsViewComponent) projectListView: ProjectListsViewComponent;

  public projectId: number;
  public projectLists: ToDoList[];

  constructor(
    private projectService: ProjectService,
    private activatedroute: ActivatedRoute,
    public projectListService: ProjectListsService) { }

  ngOnInit() {
    console.log('Trying to get project lists');
    this.projectId = this.activatedroute.snapshot.params['id'];
    this.projectService.getOne(this.projectId).subscribe(
      returnedProject => {
        console.log(`Returned data`);
        console.dir(returnedProject);
        this.projectLists = returnedProject.toDoLists;
      },
      error => {
        console.log('Hit error block');
        console.dir(error);
      }
    );
  }

  clickedEditList($event: ToDoList) {
    this.projectListService.update($event, $event.id).subscribe(
      edited => {
        const list = this.projectLists.find(p => p.id.toString() === $event.id.toString());
        list.name = edited.name;
        list.owner = edited.owner;
        this.projectListView.refreshData();
      },
      error => {
      }
    );
  }

  clickedDeleteList($event: number) {
    this.projectListService.delete($event).subscribe(
      deleted => {
        const dpId = this.projectLists.findIndex(p => p.id.toString() === $event.toString());
        console.log('deleted index: ' + dpId);
        if (dpId > -1) {
          this.projectLists.splice(dpId, 1);
          this.projectListView.refreshData();
        }
      },
      error => {
      }
    );
  }

  clickedAddNewList($event: ToDoList) {
    this.projectListService.create($event).subscribe(
      returnedList => {
        console.log('Hit success if - add new lists');
        this.projectLists.push(returnedList);
        this.projectListView.refreshData();
      },
      error => {
        console.dir(error);
      }
    );
  }
}
