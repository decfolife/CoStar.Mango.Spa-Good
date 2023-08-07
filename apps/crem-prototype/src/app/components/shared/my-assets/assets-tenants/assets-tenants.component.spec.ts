import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsTenantsComponent } from './assets-tenants.component';

describe('AssetsTenantsComponent', () => {
  let component: AssetsTenantsComponent;
  let fixture: ComponentFixture<AssetsTenantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetsTenantsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsTenantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
