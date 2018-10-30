import { ProjectDialogData } from './../../../shared/dialogs/new-project-dialog/projectDialogData';
import { MatDialog } from '@angular/material';
import { of } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

import { TodoProjectListViewComponent } from './todo-project-list-view.component';
import { MaterialImportsModule } from '../../../shared/material-imports.module';
import { ToDoProject } from '../../../shared/models/todoProject';


@Component({
    template: ''
})
export class NavigatedComponent {
}

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
describe('TodoProjectListViewComponent', () => {
  let component: TodoProjectListViewComponent;
  let fixture: ComponentFixture<TodoProjectListViewComponent>;

  beforeEach(async(() => {
    const returnData = new ProjectDialogData(null, 'Test Proj1', false);
    const dialog = new MdDialogMock();
    dialog.returnData = returnData;

    TestBed.configureTestingModule({
      imports: [ MaterialImportsModule, RouterTestingModule.withRoutes([
        { path: '', redirectTo: 'App/Projects', pathMatch: 'full' },
        { path: 'App/Projects', component: TodoProjectListViewComponent },
        { path: 'App/Todo/:id', component: NavigatedComponent }
       ]) ],
      providers: [{provide: MatDialog, useValue: dialog}],
      declarations: [ TodoProjectListViewComponent, NavigatedComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoProjectListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a link for each project in list', () => {
    const expectedProjects: ToDoProject[] = [
      new ToDoProject('Test1', 'Jon', [''], 1, null),
      new ToDoProject('Test2', 'Jon', [''], 2, null),
    ];
    component.ngOnInit();
    component.projects = expectedProjects;
    fixture.detectChanges();

    const htmlElement: HTMLElement = fixture.nativeElement;
    const links = htmlElement.getElementsByTagName('a');

    expect(links.length).toBe(2);
    // console.log(links.item(0).textContent);
    console.log(links.item(0).href);
    expect(links.item(0).textContent.trim()).toBe('Test1');
    expect(links.item(0).href.endsWith('App/Projects/1/Lists')).toBeTruthy();
    expect(links.item(1).textContent.trim()).toBe('Test2');
    expect(links.item(1).href.endsWith('App/Projects/2/Lists')).toBeTruthy();
  });

  it('should raise event when clickedAddNewProject is called and dialog returns values', () => {
    // returnData = new ProjectDialogData(null, 'Test Proj1', false);
    const expectedProjects: ToDoProject[] = [
      new ToDoProject('Test1', 'Jon', [''], 1, null),
      new ToDoProject('Test2', 'Jon', [''], 2, null),
    ];
    component.ngOnInit();
    component.projects = expectedProjects;
    fixture.detectChanges();

    const raiseEventSpy = spyOn(component, 'raiseAddedProjectEvent');

    component.clickedAddNewProject();

    expect(raiseEventSpy).toHaveBeenCalled();
    expect(raiseEventSpy).toHaveBeenCalledTimes(1);
    expect(raiseEventSpy).toHaveBeenCalledWith('Test Proj1');
    // expect(false).toBeTruthy();
  });

  it('should raise event when clickedEditProject is called and dialog returns values', () => {

    const expectedProject = new ToDoProject('Test Proj1', 'Jon', [''], 1);

    const sampleProjects: ToDoProject[] = [
      new ToDoProject('Test1', 'Jon', [''], 1),
      new ToDoProject('Test2', 'Jon', [''], 2),
    ];
    component.projects = sampleProjects;
    component.ngOnInit();
    fixture.detectChanges();

    const raiseEventSpy = spyOn(component, 'raiseEditProjectEvent');

    component.clickedEditProject(1);

    expect(raiseEventSpy).toHaveBeenCalled();
    expect(raiseEventSpy).toHaveBeenCalledTimes(1);
    expect(raiseEventSpy).toHaveBeenCalledWith(expectedProject);
    // expect(false).toBeTruthy();
  });

  it('should raise delete event when clickedEditDelete project is called and dialog returns value', () => {
    const sampleProjects: ToDoProject[] = [
      new ToDoProject('Test1', 'Jon', [''], 1),
      new ToDoProject('Test2', 'Jon', [''], 2),
    ];
    component.projects = sampleProjects;
    component.ngOnInit();
    fixture.detectChanges();

    const raiseEventSpy = spyOn(component, 'raiseDeleteProjectEvent');

    component.clickedDeleteProject(1);

    expect(raiseEventSpy).toHaveBeenCalled();
    expect(raiseEventSpy).toHaveBeenCalledTimes(1);
    expect(raiseEventSpy).toHaveBeenCalledWith(1);
    // expect(false).toBeTruthy();
  });
});
