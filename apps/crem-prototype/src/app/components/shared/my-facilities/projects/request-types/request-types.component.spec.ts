import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTypesComponent } from './request-types.component';

describe('RequestTypesComponent', () => {
  let component: RequestTypesComponent;
  let fixture: ComponentFixture<RequestTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestTypesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
