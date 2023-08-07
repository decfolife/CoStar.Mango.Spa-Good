import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesDataComponent } from './properties-data.component';

describe('PropertiesDataComponent', () => {
  let component: PropertiesDataComponent;
  let fixture: ComponentFixture<PropertiesDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PropertiesDataComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
