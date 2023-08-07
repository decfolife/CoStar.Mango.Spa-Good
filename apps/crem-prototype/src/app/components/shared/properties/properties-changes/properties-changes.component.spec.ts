import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesChangesComponent } from './properties-changes.component';

describe('PropertiesChangesComponent', () => {
  let component: PropertiesChangesComponent;
  let fixture: ComponentFixture<PropertiesChangesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PropertiesChangesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
