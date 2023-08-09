import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesOwnersComponent } from './properties-owners.component';

describe('PropertiesOwnersComponent', () => {
  let component: PropertiesOwnersComponent;
  let fixture: ComponentFixture<PropertiesOwnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PropertiesOwnersComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
