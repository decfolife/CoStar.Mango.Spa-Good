import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagDropdownComponent } from './tag-dropdown.component';

describe('TagDropdownComponent', () => {
  let component: TagDropdownComponent;
  let fixture: ComponentFixture<TagDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TagDropdownComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
