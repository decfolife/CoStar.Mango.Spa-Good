import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactivateObjectsComponent } from './reactivate-objects.component';

describe('ReactivateObjectsComponent', () => {
  let component: ReactivateObjectsComponent;
  let fixture: ComponentFixture<ReactivateObjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReactivateObjectsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactivateObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
