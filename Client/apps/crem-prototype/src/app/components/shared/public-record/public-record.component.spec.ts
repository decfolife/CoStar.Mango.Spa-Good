import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicRecordComponent } from './public-record.component';

describe('PublicRecordComponent', () => {
  let component: PublicRecordComponent;
  let fixture: ComponentFixture<PublicRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PublicRecordComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
