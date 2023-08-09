import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrototypeSelectComponent } from './prototype-select.component';

describe('PrototypeSelectComponent', () => {
  let component: PrototypeSelectComponent;
  let fixture: ComponentFixture<PrototypeSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrototypeSelectComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrototypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
