import { ToDoList } from './../../../shared/models/todoList';
import { ToDoProject } from './../../../shared/models/todoProject';
import { ProjectListsService } from './../../../shared/services/projectLists.service';
import { ProjectService } from './../../../shared/services/projects.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListsComponent } from './project-lists.component';
import { ProjectListsViewComponent } from '../../components/project-lists-view/project-lists-view.component';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-project-lists-view',
  template: '<p>Mock project list-view component</p>'
})
export class MockProjectListViewComponent extends ProjectListsViewComponent {
  constructor() {
     super(null);
  }
}
describe('ProjectListsComponent', () => {

  let component: ProjectListsComponent;
  let fixture: ComponentFixture<ProjectListsComponent>;

  let projectService: ProjectService;
  let projectListService: ProjectListsService;

  let sampleProjects: ToDoProject;

  beforeEach(async(() => {
    const paramMap = new Map();
    paramMap['id'] = 1;
    paramMap['id2'] = 2;
    // paramMap.set('id', '1');
    // paramMap.set('id2', '2');
    const activeRoute = { snapshot: { params:  paramMap } };

    const sampleLists = new Array<ToDoList>(
      new ToDoList('List1', 'Jon', 1, 1, []),
      new ToDoList('List2', 'Jon', 1, 2, []),
      new ToDoList('List3', 'Jon', 1, 3, []),
    );
    sampleProjects = new ToDoProject('Test1', 'Jon', [], 1, sampleLists);

    projectService = new ProjectService(null);
    projectListService = new ProjectListsService(null);
    const projSpy = spyOn(projectService, 'getOne').and.returnValue(of(sampleProjects));

    TestBed.configureTestingModule({
      declarations: [ ProjectListsComponent, MockProjectListViewComponent ],
      providers: [
        {provide: ProjectService, useValue: projectService},
        {provide: ProjectListsService, useValue: projectListService},
        {provide: ActivatedRoute, useValue: activeRoute}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init values correctly', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.projectId).toBe(1);
    expect(component.projectLists).toBe(sampleProjects.ProjectLists);
    // expect(false).toBeTruthy();
  });

  it('should call add new when even triggered in child', () => {
    const expectedList = new ToDoList('Test', 'Jon', 1);

    component.ngOnInit();
    fixture.detectChanges();

    const childDebugEl = fixture.debugElement.query(By.directive(MockProjectListViewComponent));
    const childComponent = childDebugEl.componentInstance;
    const componentSpy = spyOn(component, 'clickedAddNewList');

    // do stuff
    childComponent.raiseAddListEvent(expectedList);

    expect(componentSpy).toHaveBeenCalled();
    expect(componentSpy).toHaveBeenCalledTimes(1);
    expect(componentSpy).toHaveBeenCalledWith(expectedList);
    // expect(false).toBeTruthy();
  });

  it('should call update when event triggered in child', () => {
    const expectedList = new ToDoList('Test', 'Jon', 1);

    component.ngOnInit();
    fixture.detectChanges();

    const childDebugEl = fixture.debugElement.query(By.directive(MockProjectListViewComponent));
    const childComponent = childDebugEl.componentInstance;
    const componentSpy = spyOn(component, 'clickedEditList');

    // do stuff
    childComponent.raiseEditListEvent(expectedList);

    expect(componentSpy).toHaveBeenCalled();
    expect(componentSpy).toHaveBeenCalledTimes(1);
    expect(componentSpy).toHaveBeenCalledWith(expectedList);

    // expect(false).toBeTruthy();
  });

  it('should call delete when event triggered in child', () => {
    const expectedList = new ToDoList('Test', 'Jon', 1);

    component.ngOnInit();
    fixture.detectChanges();

    const childDebugEl = fixture.debugElement.query(By.directive(MockProjectListViewComponent));
    const childComponent = childDebugEl.componentInstance;
    const componentSpy = spyOn(component, 'clickedDeleteList');

    // do stuff
    childComponent.raiseDeleteListEvent(expectedList);

    expect(componentSpy).toHaveBeenCalled();
    expect(componentSpy).toHaveBeenCalledTimes(1);
    expect(componentSpy).toHaveBeenCalledWith(expectedList);

    // expect(false).toBeTruthy();
  });

  it('should add new project and refresh data in child', () => {
    const newList = new ToDoList('NewList', 'Jon', 1);
    const projListService = component.projectListService;
    const serviceSpy = spyOn(projListService, 'create').and.
            returnValue(of(new ToDoList('NewList', 'Jon', 1)));
    component.ngOnInit();
    fixture.detectChanges();
    const childDebugEl = fixture.debugElement.query(By.directive(MockProjectListViewComponent));
    const childComponent = childDebugEl.componentInstance;
    component.projectListView = childComponent; // set child object in parent
    const componentSpy = spyOn(childComponent, 'refreshData');

    component.clickedAddNewList(newList);

    expect(serviceSpy).toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalledTimes(1);
    expect(serviceSpy).toHaveBeenCalledWith(newList);
    expect(componentSpy).toHaveBeenCalled();
    expect(component.projectLists.length).toBe(4);
    // expect(false).toBeTruthy();
  });

  it('should edit project and refresh data in child', () => {
    const updatedList = new ToDoList('List1(updated)', 'Jon', 1, 1, []);

    const projListService = component.projectListService;
    const serviceSpy = spyOn(projListService, 'update').and.
            returnValue(of(new ToDoList('List1(updated)', 'Jon', 1, 1, [])));
    component.ngOnInit();
    fixture.detectChanges();
    const childDebugEl = fixture.debugElement.query(By.directive(MockProjectListViewComponent));
    const childComponent = childDebugEl.componentInstance;
    component.projectListView = childComponent; // set child object in parent
    const componentSpy = spyOn(childComponent, 'refreshData');

    component.clickedEditList(updatedList);

    expect(serviceSpy).toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalledTimes(1);
    expect(serviceSpy).toHaveBeenCalledWith(updatedList, updatedList.id);
    expect(componentSpy).toHaveBeenCalled();
    const updatedItem = component.projectLists.find(p => p.id.toString() === updatedList.id.toString());
    expect(updatedItem.Name).toBe('List1(updated)');
    expect(updatedItem.Owner).toBe('Jon');
    // expect(false).toBeTruthy();
  });

  it('should delete project and refresh data in child', () => {
    const projListService = component.projectListService;
    const serviceSpy = spyOn(projListService, 'delete').and.
            returnValue(of(1));
    component.ngOnInit();
    fixture.detectChanges();
    const childDebugEl = fixture.debugElement.query(By.directive(MockProjectListViewComponent));
    const childComponent = childDebugEl.componentInstance;
    component.projectListView = childComponent; // set child object in parent
    const componentSpy = spyOn(childComponent, 'refreshData');

    component.clickedDeleteList(3);

    expect(serviceSpy).toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalledTimes(1);
    expect(serviceSpy).toHaveBeenCalledWith(3);
    expect(componentSpy).toHaveBeenCalled();
    const deletedItem = component.projectLists.find(p => p.id.toString() === '3');
    expect(deletedItem).toBeFalsy();
    expect(component.projectLists.length).toBe(2);
    // expect(false).toBeTruthy();
  });
});
