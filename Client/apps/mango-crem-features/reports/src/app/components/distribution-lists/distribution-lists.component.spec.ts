import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionListsComponent } from './distribution-lists.component';

describe('DistributionListsComponent', () => {
  let component: DistributionListsComponent;
  let fixture: ComponentFixture<DistributionListsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributionListsComponent],
    });
    fixture = TestBed.createComponent(DistributionListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
