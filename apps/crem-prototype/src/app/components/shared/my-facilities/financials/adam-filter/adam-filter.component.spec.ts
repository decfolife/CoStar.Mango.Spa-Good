import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdamFilterComponent } from './adam-filter.component';

describe('AdamFilterComponent', () => {
  let component: AdamFilterComponent;
  let fixture: ComponentFixture<AdamFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdamFilterComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdamFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
