import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

import { YesNoDialogComponent } from './../shared/dialogs/yes-no-dialog/yes-no-dialog.component';
import { ProjectListsService } from './../shared/services/projectLists.service';
import { SharedModule } from './../shared/shared.module';
import { TodoProjectListComponent } from './containers/todo-project-list/todo-project-list.component';
import { TodoProjectListViewComponent } from './components/todo-project-list-view/todo-project-list-view.component';
import { ProjectService } from '../shared/services/projects.service';
import { TodoListComponent } from './containers/todo-list/todo-list.component';
import { TodoListViewComponent } from './components/todo-list-view/todo-list-view.component';
import { FormsModule, ReactiveFormsModule } from '../../../node_modules/@angular/forms';
import { SharedProjectListComponent } from './containers/shared-project-list/shared-project-list.component';
import { ProjectListsComponent } from './containers/project-lists/project-lists.component';
import { ProjectListsViewComponent } from './components/project-lists-view/project-lists-view.component';
import { ToDoItemService } from '../shared/services/toDoItem.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TodoProjectListComponent,
    TodoProjectListViewComponent,
    TodoListComponent,
    TodoListViewComponent,
    SharedProjectListComponent,
    ProjectListsComponent,
    ProjectListsViewComponent
  ],
  providers: [
    ProjectService,
    ProjectListsService,
    ToDoItemService
  ],
  exports: [
    TodoProjectListComponent
  ]
})
export class TodoModule { }
