import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTemplatesComponent } from './request-templates.component';

describe('RequestTemplatesComponent', () => {
  let component: RequestTemplatesComponent;
  let fixture: ComponentFixture<RequestTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestTemplatesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
