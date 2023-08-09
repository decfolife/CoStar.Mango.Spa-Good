import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentLeaseComponent } from './equipment-lease.component';

describe('EquipmentLeaseComponent', () => {
  let component: EquipmentLeaseComponent;
  let fixture: ComponentFixture<EquipmentLeaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EquipmentLeaseComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentLeaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
