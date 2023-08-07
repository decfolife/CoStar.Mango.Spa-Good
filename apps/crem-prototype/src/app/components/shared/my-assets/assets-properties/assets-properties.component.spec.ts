import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsPropertiesComponent } from './assets-properties.component';

describe('AssetsPropertiesComponent', () => {
  let component: AssetsPropertiesComponent;
  let fixture: ComponentFixture<AssetsPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetsPropertiesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
