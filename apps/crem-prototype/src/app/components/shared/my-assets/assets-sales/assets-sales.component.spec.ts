import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsSalesComponent } from './assets-sales.component';

describe('AssetsSalesComponent', () => {
  let component: AssetsSalesComponent;
  let fixture: ComponentFixture<AssetsSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetsSalesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
