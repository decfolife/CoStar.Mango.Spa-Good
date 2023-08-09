import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFieldAssociationsComponent } from './data-field-associations.component';

describe('DataFieldAssociationsComponent', () => {
  let component: DataFieldAssociationsComponent;
  let fixture: ComponentFixture<DataFieldAssociationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataFieldAssociationsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataFieldAssociationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
