import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioEquipmentComponent } from './portfolio-equipment.component';

describe('PortfolioEquipmentComponent', () => {
  let component: PortfolioEquipmentComponent;
  let fixture: ComponentFixture<PortfolioEquipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioEquipmentComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
