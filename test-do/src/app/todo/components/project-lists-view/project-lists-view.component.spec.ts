import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

import { ToDoList } from './../../../shared/models/todoList';
import { ProjectListsViewComponent } from './project-lists-view.component';
import { MaterialImportsModule } from 'src/app/shared/material-imports.module';
import { ProjectDialogData } from 'src/app/shared/dialogs/new-project-dialog/projectDialogData';
import { ToDoItem } from 'src/app/shared/models/todoItem';
import { of } from 'rxjs/internal/observable/of';

export class MdDialogMock {
  public returnData: ProjectDialogData;
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of(this.returnData)
    };
  }
}

describe('ProjectListsViewComponent', () => {
  let component: ProjectListsViewComponent;
  let fixture: ComponentFixture<ProjectListsViewComponent>;

  beforeEach(async(() => {
    let projectListData: ToDoList;

    projectListData = new ToDoList('TestList', 'Jon', 1, 1, new Array<ToDoItem>(
      new ToDoItem('Item1', false, 1, 1),
      new ToDoItem('Item2', false, 1, 2),
      new ToDoItem('Item3', false, 1, 3),
    ));

    const dialog = new MdDialogMock();
    dialog.returnData = new ProjectDialogData(null, 'NewList', false);

    TestBed.configureTestingModule({
      imports: [MaterialImportsModule, RouterTestingModule],
      providers: [{provide: MatDialog, useValue: dialog}],
      declarations: [ ProjectListsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a link for each list', () => {
    const data = new ToDoList('TestList', 'Jon', 1, 1, new Array<ToDoItem>(
      new ToDoItem('Item1', false, 1, 1),
      new ToDoItem('Item2', false, 1, 2),
      new ToDoItem('Item3', false, 1, 3),
    ));
    component.projectLists = new Array<ToDoList>(data);
    component.projectId = 1;
    component.ngOnInit();
    fixture.detectChanges();
    component.refreshData();

    const htmlElement: HTMLElement = fixture.nativeElement;
    const links = htmlElement.getElementsByTagName('a');

    console.log(links.item(0).href);
    expect(links.length).toBe(1);
    expect(links.item(0).textContent.trim()).toBe('TestList');
    expect(links.item(0).href.endsWith('App/Projects/1/Todo/1')).toBeTruthy();
    // expect(false).toBeTruthy();
  });

  it('should raise event when adding new project and got value from dialog', () => {
    const data = new ToDoList('TestList', 'Jon', 1, 1, new Array<ToDoItem>(
      new ToDoItem('Item1', false, 1, 1),
      new ToDoItem('Item2', false, 1, 2),
      new ToDoItem('Item3', false, 1, 3),
    ));

    const expectedList = new ToDoList('NewList', 'Jonathan', 1);

    const componentSpy = spyOn(component, 'raiseAddListEvent');
    component.projectLists = new Array<ToDoList>(data);
    component.projectId = 1;
    component.ngOnInit();
    fixture.detectChanges();

    component.clickedAddNewList();

    console.log('Expected:');
    console.dir(expectedList);
    expect(componentSpy).toHaveBeenCalled();
    expect(componentSpy).toHaveBeenCalledWith(expectedList);
    // expect(false).toBeTruthy();
  });

  it('should raise event when editing project and got value from dialog', () => {
    const data = new ToDoList('TestList', 'Jon', 1, 1, new Array<ToDoItem>(
      new ToDoItem('Item1', false, 1, 1),
      new ToDoItem('Item2', false, 1, 2),
      new ToDoItem('Item3', false, 1, 3),
    ));

    const expectedList = new ToDoList('NewList', 'Jon', 1, 1);

    const componentSpy = spyOn(component, 'raiseEditListEvent');
    component.projectLists = new Array<ToDoList>(data);
    component.projectId = 1;
    component.ngOnInit();
    fixture.detectChanges();

    component.clickedEditList(1);

    expect(componentSpy).toHaveBeenCalled();
    expect(componentSpy).toHaveBeenCalledTimes(1);
    expect(componentSpy).toHaveBeenCalledWith(expectedList);
    // expect(false).toBeTruthy();
  });

  // it('should NOT raise event when adding new project and did NOT get value from dialog', () => {
  //   expect(false).toBeTruthy();
  // });
});
