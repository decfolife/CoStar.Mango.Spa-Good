import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HierarchyDropdownComponent } from './hierarchy-dropdown.component';

describe('DropdownComponent', () => {
  let component: HierarchyDropdownComponent;
  let fixture: ComponentFixture<HierarchyDropdownComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HierarchyDropdownComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchyDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
