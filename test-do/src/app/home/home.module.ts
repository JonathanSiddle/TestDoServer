import { TodoProjectListComponent } from './../todo/containers/todo-project-list/todo-project-list.component';
import { TodoModule } from './../todo/todo.module';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

import { TodoListComponent } from '../todo/containers/todo-list/todo-list.component';
import { NewProjectDialogComponent } from '../shared/dialogs/new-project-dialog/new-project-dialog.component';
import { SharedProjectListComponent } from '../todo/containers/shared-project-list/shared-project-list.component';
import { ProjectListsComponent } from '../todo/containers/project-lists/project-lists.component';
import { YesNoDialogComponent } from '../shared/dialogs/yes-no-dialog/yes-no-dialog.component';

const routes: Routes = [
  {path: 'App/Projects/:id1/Todo/:id2', component: TodoListComponent},
  {path: 'App/Projects/:id/Lists', component: ProjectListsComponent},
  {path: 'App/Projects', component: TodoProjectListComponent},
  {path: 'App/SharedProjects', component: SharedProjectListComponent},
  {path: '', redirectTo: 'App/Projects', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    // RouterModule.forRoot(routes),
    CommonModule,
    SharedModule,
    TodoModule
  ],
  entryComponents: [
    NewProjectDialogComponent,
    YesNoDialogComponent
  ],
  declarations: [
    HomePageComponent,
  ],
  exports: [
    HomePageComponent,
    RouterModule
  ]
})
export class HomeModule { }
