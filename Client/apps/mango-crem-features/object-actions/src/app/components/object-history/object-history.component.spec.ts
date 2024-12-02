import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectHistoryComponent } from './object-history.component';

describe('ObjectHistoryComponent', () => {
  let component: ObjectHistoryComponent;
  let fixture: ComponentFixture<ObjectHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectHistoryComponent],
    });
    fixture = TestBed.createComponent(ObjectHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
