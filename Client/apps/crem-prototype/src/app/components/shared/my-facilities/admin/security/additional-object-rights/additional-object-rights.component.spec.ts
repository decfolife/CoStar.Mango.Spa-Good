import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalObjectRightsComponent } from './additional-object-rights.component';

describe('AdditionalObjectRightsComponent', () => {
  let component: AdditionalObjectRightsComponent;
  let fixture: ComponentFixture<AdditionalObjectRightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdditionalObjectRightsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalObjectRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
