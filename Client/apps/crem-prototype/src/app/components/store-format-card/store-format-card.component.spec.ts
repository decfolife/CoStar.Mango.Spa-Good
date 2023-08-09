import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFormatCardComponent } from './store-format-card.component';

describe('StoreFormatCardComponent', () => {
  let component: StoreFormatCardComponent;
  let fixture: ComponentFixture<StoreFormatCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoreFormatCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFormatCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
