import { MaterialImportsModule } from './../../../shared/material-imports.module';
import { TodoProjectListViewComponent } from './../../components/todo-project-list-view/todo-project-list-view.component';
import { ProjectService } from './../../../shared/services/projects.service';
import { async, ComponentFixture, TestBed, fakeAsync, discardPeriodicTasks, tick } from '@angular/core/testing';
import { TodoProjectListComponent } from './todo-project-list.component';
import { ToDoProject } from '../../../shared/models/todoProject';
import { NO_ERRORS_SCHEMA, Component, Input } from '@angular/core';
import { of, timer } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { By } from '@angular/platform-browser';

// @Component({
//   selector: 'app-todo-project-list-view',
//   template: '<p>Mock project list-view component</p>'
// })
// class MockProjectListViewComponent {
//   @Input() public projects: Array<ToDoProject>;
// }
@Component({
    selector: 'app-todo-project-list-view',
    template: '<p>Mock project list-view component</p>'
  })
export class MockProjectListViewComponent extends TodoProjectListViewComponent {
    constructor() {
       super(null);
    }
}
describe('TodoProjectListComponent', () => {

  let component: TodoProjectListComponent;
  let childComponent: MockProjectListViewComponent;
  let fixture: ComponentFixture<TodoProjectListComponent>;

  // SET UP
  beforeEach(async(() => {
    const projects: ToDoProject[] = [
      new ToDoProject('Test1', 'Jon', [''], 1, null),
      new ToDoProject('Test2', 'Jon', [''], 2, null),
    ];

    let projectService: ProjectService;
    projectService = new ProjectService(null);
    const projSpy = spyOn(projectService, 'getAll').and.returnValue(of(projects));

    TestBed.configureTestingModule({
      declarations: [ TodoProjectListComponent, MockProjectListViewComponent],
      providers: [
        {provide: ProjectService, useValue: projectService}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TESTS
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get projects after init', () => {
    const expectedProjects: ToDoProject[] = [
      new ToDoProject('Test1', 'Jon', [''], 1, null),
      new ToDoProject('Test2', 'Jon', [''], 2, null),
    ];
    // override the existing http spy method with new data

    component.ngOnInit();

    expect(component.projects).toEqual(expectedProjects);
    // expect(false).toBeTruthy();
  });

  it('should get projects after init async(with delay)', fakeAsync(() => {
    const expectedProjects: ToDoProject[] = [
      new ToDoProject('Test1', 'Jon', [''], 1, null),
      new ToDoProject('Test2', 'Jon', [''], 2, null),
    ];
    const newProjectService = new ProjectService(null);
    const serviceSpy = spyOn(newProjectService, 'getAll')
      .and.returnValue(timer(1000).pipe(mapTo(expectedProjects)));
    component.projectService = newProjectService;

    component.projects = [];
    expect(component.projects).toEqual([]);
    // console.dir(component.projects);

    component.ngOnInit();
    tick(2000);
    fixture.detectChanges();
    expect(component.projects).toEqual(expectedProjects);
    // expect(false).toBeTruthy();
  }));

  it('should set property of child component', fakeAsync(() => {
    const expectedProjects: ToDoProject[] = [
      new ToDoProject('Test1', 'Jon', [''], 1, null),
      new ToDoProject('Test2', 'Jon', [''], 2, null),
    ];

    component.ngOnInit();
    fixture.detectChanges();
    const childDebugEl = fixture.debugElement.query(By.directive(MockProjectListViewComponent));
    childComponent = childDebugEl.componentInstance;

    expect(component.projects).toEqual(expectedProjects);
    expect(childComponent.projects).toEqual(expectedProjects);
    // expect(false).toBeTruthy();
  }));

  it('should only create child component after setting projects in host (async)', fakeAsync(() => {
    const expectedProjects: ToDoProject[] = [
      new ToDoProject('Test1', 'Jon', [''], 1, null),
      new ToDoProject('Test2', 'Jon', [''], 2, null),
    ];
    const newProjectService = new ProjectService(null);
    const serviceSpy = spyOn(newProjectService, 'getAll')
      .and.returnValue(timer(1000).pipe(mapTo(expectedProjects)));
    component.projectService = newProjectService;

    component.projects = null;
    component.ngOnInit();
    fixture.detectChanges();

    const htmlElement: HTMLElement = fixture.nativeElement;
    expect(htmlElement.textContent).toEqual('');
    tick(2000);
    fixture.detectChanges();
    expect(htmlElement.textContent).toEqual('Mock project list-view component');
    expect(component.projects).toEqual(expectedProjects);
    // expect(false).toBeTruthy();
  }));

  it('should called new project method after child event', () => {
    const expectedProjects: ToDoProject[] = [
      new ToDoProject('Test1', 'Jon', [''], 1, null),
      new ToDoProject('Test2', 'Jon', [''], 2, null),
    ];

    component.ngOnInit();
    fixture.detectChanges();
    const childDebugEl = fixture.debugElement.query(By.directive(MockProjectListViewComponent));
    childComponent = childDebugEl.componentInstance;

    // testy stuff
    const componentSpy = spyOn(component, 'addedNewProject');
    childComponent.raiseAddedProjectEvent('testProject');

    expect(componentSpy).toHaveBeenCalled();
    expect(componentSpy).toHaveBeenCalledTimes(1);
    expect(componentSpy).toHaveBeenCalledWith('testProject');
    // expect(false).toBeTruthy();
  });

  it('should send new Project to server and refresh data when addNewProject called', () => {
    const expectedProjects: ToDoProject[] = [
      new ToDoProject('Test1', 'Jon', [''], 1, null),
      new ToDoProject('Test2', 'Jon', [''], 2, null),
      new ToDoProject('testProject', 'Jonathan', [], 3, [])
    ];
    const expectedProject = new ToDoProject('testProject', 'Jonathan', [], 3, []);

    const serviceSpy = spyOn(component.projectService, 'create')
      .and.returnValue(of(expectedProject));
    component.ngOnInit();
    fixture.detectChanges();
    const childDebugEl = fixture.debugElement.query(By.directive(MockProjectListViewComponent));
    childComponent = childDebugEl.componentInstance;
    // const ProjectServiceSpy = spyOn(component.p, 'refreshData');

    // testy stuff
    const componentSpy = spyOn(childComponent, 'refreshData');
    component.projectListView = childComponent;
    component.addedNewProject('testProject');

    expect(serviceSpy).toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalledTimes(1);
    expect(component.projects).toEqual(expectedProjects);
    expect(componentSpy).toHaveBeenCalled();
    expect(componentSpy).toHaveBeenCalledTimes(1);
    // expect(false).toBeTruthy();
  });

  it('should send project to server and refresh data when deletedProject called', () => {
    const expectedProjects: ToDoProject[] = [
      new ToDoProject('Test1', 'Jon', [''], 1, null),
    ];

    const serviceSpy = spyOn(component.projectService, 'delete')
      .and.returnValue(of(''));
    component.ngOnInit();
    fixture.detectChanges();
    const childDebugEl = fixture.debugElement.query(By.directive(MockProjectListViewComponent));
    childComponent = childDebugEl.componentInstance;
    // const ProjectServiceSpy = spyOn(component.p, 'refreshData');

    // testy stuff
    const componentSpy = spyOn(childComponent, 'refreshData');
    component.projectListView = childComponent;
    component.deletedProject(2);

    expect(serviceSpy).toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalledTimes(1);
    expect(component.projects).toEqual(expectedProjects);
    expect(componentSpy).toHaveBeenCalled();
    expect(componentSpy).toHaveBeenCalledTimes(1);
    // expect(false).toBeTruthy();
  });

  it('should send project to server and refresh data when editedProject called', () => {
    const expectedProjects: ToDoProject[] = [
      new ToDoProject('Test1', 'Jon', [''], 1, null),
      new ToDoProject('Test2(update)', 'Jon', [''], 2, null),
    ];

    const expectedProject = new ToDoProject('Test2(update)', 'Jon', [''], 2, null);

    const serviceSpy = spyOn(component.projectService, 'update')
      .and.returnValue(of(expectedProject));
    component.ngOnInit();
    fixture.detectChanges();
    const childDebugEl = fixture.debugElement.query(By.directive(MockProjectListViewComponent));
    childComponent = childDebugEl.componentInstance;
    // const ProjectServiceSpy = spyOn(component.p, 'refreshData');

    // testy stuff
    const componentSpy = spyOn(childComponent, 'refreshData');
    component.projectListView = childComponent;
    component.editedProject(expectedProject);

    expect(serviceSpy).toHaveBeenCalled();
    expect(serviceSpy).toHaveBeenCalledTimes(1);
    expect(component.projects).toEqual(expectedProjects);
    expect(componentSpy).toHaveBeenCalled();
    expect(componentSpy).toHaveBeenCalledTimes(1);
    // expect(false).toBeTruthy();
  });
});
