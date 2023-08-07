import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartPageSelectComponent } from './start-page-select.component';

describe('StartPageSelectComponent', () => {
  let component: StartPageSelectComponent;
  let fixture: ComponentFixture<StartPageSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StartPageSelectComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartPageSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
