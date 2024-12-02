import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionListsMembersComponent } from './distribution-lists-members.component';

describe('DistributionListsMembersComponent', () => {
  let component: DistributionListsMembersComponent;
  let fixture: ComponentFixture<DistributionListsMembersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributionListsMembersComponent],
    });
    fixture = TestBed.createComponent(DistributionListsMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
