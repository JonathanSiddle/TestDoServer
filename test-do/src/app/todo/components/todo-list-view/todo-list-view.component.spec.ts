
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TodoListViewComponent } from './todo-list-view.component';
import { ToDoItem } from './../../../shared/models/todoItem';
import { ToDoList } from './../../../shared/models/todoList';
import { MaterialImportsModule } from './../../../shared/material-imports.module';

describe('TodoListViewComponent', () => {
  let component: TodoListViewComponent;
  let fixture: ComponentFixture<TodoListViewComponent>;
  const list = new ToDoList('List', 'Jon', 1, 1, new Array<ToDoItem>(
    new ToDoItem('Item1', false, 1, 1),
    new ToDoItem('Item2', false, 1, 2),
    new ToDoItem('Item3', false, 1, 3),
  ));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialImportsModule, ReactiveFormsModule, NoopAnimationsModule],
      declarations: [ TodoListViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListViewComponent);
    component = fixture.componentInstance;
    component.toDoList = list;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create li for each to do item', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const htmlElement: HTMLElement = fixture.nativeElement;
    const links = htmlElement.getElementsByTagName('li');

    expect(links.length).toBe(3);
    expect(links[0].textContent.includes('Item1')).toBeTruthy();
    expect(links[1].textContent.includes('Item2')).toBeTruthy();
    expect(links[2].textContent.includes('Item3')).toBeTruthy();
    // expect(false).toBeTruthy();
  });

  it('should call raiseNewEvent when clickSave(null) is called', () => {
    const expectedItem = new ToDoItem('NewItem', false, 1);
    const valueSpy = spyOnProperty(component, 'itemName', 'get').and.returnValue({value: 'NewItem', reset: () => {}});
    const eventSpy = spyOn(component, 'raiseAddNewEvent');

    component.ngOnInit();
    fixture.detectChanges();

    component.clickedSave(null);

    expect(eventSpy).toHaveBeenCalled();
    expect(eventSpy).toHaveBeenCalledWith(expectedItem);
    // expect(false).toBeTruthy();
  });

  it('calling clickedCheckBox flips the complete value and calls save', () => {
    const expectedItem = new ToDoItem('Item1', true, 1, 1);

    const saveSpy = spyOn(component, 'clickedSave');
    component.ngOnInit();
    fixture.detectChanges();

    component.clickedCheckBox(1);

    expect(saveSpy).toHaveBeenCalled();
    expect(saveSpy).toHaveBeenCalledWith(expectedItem);
    // expect(false).toBeTruthy();
  });
});
