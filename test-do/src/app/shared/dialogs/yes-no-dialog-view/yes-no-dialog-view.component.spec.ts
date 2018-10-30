import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YesNoDialogViewComponent } from './yes-no-dialog-view.component';

describe('YesNoDialogViewComponent', () => {
  let component: YesNoDialogViewComponent;
  let fixture: ComponentFixture<YesNoDialogViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YesNoDialogViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YesNoDialogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should raise event with false when click no', () => {
    component.ngOnInit()
    fixture.detectChanges();
    const eventSpy = spyOn(component, 'raiseEvent');

    component.clickedNo();

    expect(eventSpy).toHaveBeenCalled();
    expect(eventSpy).toHaveBeenCalledWith(false);
  });

  it('should raise event with true when click yes', () => {
    component.ngOnInit()
    fixture.detectChanges();
    const eventSpy = spyOn(component, 'raiseEvent');

    component.clickedYes();

    expect(eventSpy).toHaveBeenCalled();
    expect(eventSpy).toHaveBeenCalledWith(true);
  });
});
