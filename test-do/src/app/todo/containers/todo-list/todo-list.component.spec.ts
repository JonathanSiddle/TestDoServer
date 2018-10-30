import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

import { ToDoItem } from './../../../shared/models/todoItem';
import { ToDoProject } from './../../../shared/models/todoProject';
import { ToDoItemService } from './../../../shared/services/toDoItem.service';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { TodoListViewComponent } from './../../components/todo-list-view/todo-list-view.component';
import { ProjectListsService } from 'src/app/shared/services/projectLists.service';
import { ToDoList } from 'src/app/shared/models/todoList';
import { of, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';


@Component({
    selector: 'app-todo-list-view',
    template: '<p>Mock to do list view component</p>'
})
export class MockToDOListViewComponent extends TodoListViewComponent {
constructor() {
    super();
}
}
describe('TodoListComponent', () => {

  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  let projectListService: ProjectListsService;
  let toDoItemService: ToDoItemService;

  let plistSpy: jasmine.Spy ;

  beforeEach(async(() => {
    const paramMap = new Map();
    paramMap['id1'] = 1;
    paramMap['id2'] = 2;
    // paramMap.set('id', '1');
    // paramMap.set('id2', '2');
    const activeRoute = { snapshot: { params:  paramMap } };

    const listItems = new Array<ToDoItem>(
        new ToDoItem('Item1', false, 1, 1),
        new ToDoItem('Item2', false, 1, 2),
        new ToDoItem('Item3', false, 1, 3),
    );
    const sampleList = new ToDoList('List1', 'Jon', 1, 1, listItems);

    projectListService = new ProjectListsService(null);
    toDoItemService = new ToDoItemService(null);

    plistSpy = spyOn(projectListService, 'getOne').and.returnValue(of(sampleList));

    TestBed.configureTestingModule({
      declarations: [ TodoListComponent, MockToDOListViewComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: activeRoute},
        {provide: ProjectListsService, useValue: projectListService},
        {provide: ToDoItemService, useValue: toDoItemService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init values correctly', () => {
    const expectedItems = new Array<ToDoItem>(
        new ToDoItem('Item1', false, 1, 1),
        new ToDoItem('Item2', false, 1, 2),
        new ToDoItem('Item3', false, 1, 3),
    );
    const expectedList = new ToDoList('List1', 'Jon', 1, 1, expectedItems);
    component.ngOnInit();
    fixture.detectChanges();

    // console.dir(component.todoListToDisplay);
    expect(component.projectId).toBe(1);
    expect(component.todoListId).toBe(2);
    expect(component.todoListToDisplay).toEqual(expectedList);
    // expect(false).toBeTruthy();
  });

  it('should only create child after initing values', fakeAsync(() => {
    const listItems = new Array<ToDoItem>(
      new ToDoItem('Item1', false, 1, 1),
      new ToDoItem('Item2', false, 1, 2),
      new ToDoItem('Item3', false, 1, 3),
    );
    const htmlElement: HTMLElement = fixture.nativeElement;
    const sampleList = new ToDoList('List1', 'Jon', 1, 1, listItems);
    plistSpy.and.returnValue(timer(1000).pipe(mapTo(sampleList)));
    component.todoListToDisplay = null;
    fixture.detectChanges();

    component.ngOnInit();
    expect(htmlElement.textContent).toEqual('');
    tick(2000);
    fixture.detectChanges();

    expect(htmlElement.textContent.trim()).toEqual('Mock to do list view component');
    // expect(false).toBeTruthy();
  }));

  it('should set values correctly in child', () => {
    const expectedItems = new Array<ToDoItem>(
      new ToDoItem('Item1', false, 1, 1),
      new ToDoItem('Item2', false, 1, 2),
      new ToDoItem('Item3', false, 1, 3),
    );

    const expectedList = new ToDoList('List1', 'Jon', 1, 1, expectedItems);
    component.ngOnInit();
    fixture.detectChanges();
    const childDebugEl = fixture.debugElement.query(By.directive(MockToDOListViewComponent));
    const childComponent = childDebugEl.componentInstance;

    expect(childComponent.projectId).toBe(component.projectId);
    expect(childComponent.toDoList).toBe(component.todoListToDisplay);
    // expect(false).toBeTruthy();
  });

  it('should raise add event when triggered in child', () => {
    const expectedItems = new Array<ToDoItem>(
      new ToDoItem('Item1', false, 1, 1),
      new ToDoItem('Item2', false, 1, 2),
      new ToDoItem('Item3', false, 1, 3),
    );

    const expectedList = new ToDoList('List1', 'Jon', 1, 1, expectedItems);
    component.ngOnInit();
    fixture.detectChanges();
    const childDebugEl = fixture.debugElement.query(By.directive(MockToDOListViewComponent));
    const childComponent = childDebugEl.componentInstance;
    const componentSpy = spyOn(component, 'addedNewItem');

    childComponent.raiseAddNewEvent(expectedList[1]);

    expect(componentSpy).toHaveBeenCalled();
    expect(componentSpy).toHaveBeenCalledTimes(1);
    expect(componentSpy).toHaveBeenCalledWith(expectedList[1]);
    // expect(false).toBeTruthy();
  });

  it('should raise edit event when triggered in child', () => {
    const expectedItems = new Array<ToDoItem>(
      new ToDoItem('Item1', false, 1, 1),
      new ToDoItem('Item2', false, 1, 2),
      new ToDoItem('Item3', false, 1, 3),
    );

    const expectedList = new ToDoList('List1', 'Jon', 1, 1, expectedItems);
    component.ngOnInit();
    fixture.detectChanges();
    const childDebugEl = fixture.debugElement.query(By.directive(MockToDOListViewComponent));
    const childComponent = childDebugEl.componentInstance;
    const componentSpy = spyOn(component, 'editedItem');

    childComponent.raiseEditEvent(expectedList[1]);

    expect(componentSpy).toHaveBeenCalled();
    expect(componentSpy).toHaveBeenCalledTimes(1);
    expect(componentSpy).toHaveBeenCalledWith(expectedList[1]);
    // expect(false).toBeTruthy();
  });

  it('should raise delete event when triggered in child', () => {
    const expectedItems = new Array<ToDoItem>(
      new ToDoItem('Item1', false, 1, 1),
      new ToDoItem('Item2', false, 1, 2),
      new ToDoItem('Item3', false, 1, 3),
    );

    const expectedList = new ToDoList('List1', 'Jon', 1, 1, expectedItems);
    component.ngOnInit();
    fixture.detectChanges();
    const childDebugEl = fixture.debugElement.query(By.directive(MockToDOListViewComponent));
    const childComponent = childDebugEl.componentInstance;
    const componentSpy = spyOn(component, 'deleteItem');

    childComponent.clickedDeleteItem(1);

    expect(componentSpy).toHaveBeenCalled();
    expect(componentSpy).toHaveBeenCalledTimes(1);
    expect(componentSpy).toHaveBeenCalledWith(1);
    // expect(false).toBeTruthy();
  });

  it('should send data to server and updated list when addedNewItem called', () => {
    const expectedItems = new Array<ToDoItem>(
      new ToDoItem('Item1', false, 1, 1),
      new ToDoItem('Item2', false, 1, 2),
      new ToDoItem('Item3', false, 1, 3),
      new ToDoItem('Item4', false, 1, 4),
    );

    const expectedItem = new ToDoItem('Item4', false, 1, 4);
    const serviceSpy = spyOn(component.toDoItemService, 'create')
      .and.returnValue(of(expectedItem));
    component.ngOnInit();
    fixture.detectChanges();

    component.addedNewItem(expectedItem);

    expect(serviceSpy).toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalledTimes(1);
    expect(serviceSpy).toHaveBeenCalledWith(expectedItem);
    expect(component.todoListToDisplay.ListItems).toEqual(expectedItems);
    // expect(false).toBeTruthy();
  });

  it('should send data to server and updated list item when editedItem called', () => {
    const expectedItems = new Array<ToDoItem>(
      new ToDoItem('Item1', false, 1, 1),
      new ToDoItem('Item2(Updated)', false, 1, 2),
      new ToDoItem('Item3', false, 1, 3),
    );

    const expectedItem = new ToDoItem('Item2(Updated)', false, 1, 2);
    const serviceSpy = spyOn(component.toDoItemService, 'update')
      .and.returnValue(of(expectedItem));
    component.ngOnInit();
    fixture.detectChanges();

    component.editedItem(expectedItem);

    expect(serviceSpy).toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalledTimes(1);
    expect(serviceSpy).toHaveBeenCalledWith(expectedItem, 2);
    expect(component.todoListToDisplay.ListItems).toEqual(expectedItems);
    // expect(false).toBeTruthy();
  });

  it('should send data to server and delete list item when deleteItem called', () => {
    const expectedItems = new Array<ToDoItem>(
      new ToDoItem('Item1', false, 1, 1),
      new ToDoItem('Item3', false, 1, 3),
    );

    const serviceSpy = spyOn(component.toDoItemService, 'delete')
      .and.returnValue(of(''));
    component.ngOnInit();
    fixture.detectChanges();

    component.deleteItem(2);

    expect(serviceSpy).toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalledTimes(1);
    expect(serviceSpy).toHaveBeenCalledWith(2);
    expect(component.todoListToDisplay.ListItems).toEqual(expectedItems);
    // expect(false).toBeTruthy();
  });
});
