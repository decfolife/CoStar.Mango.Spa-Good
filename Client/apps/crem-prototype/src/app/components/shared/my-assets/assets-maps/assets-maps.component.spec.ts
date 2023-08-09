import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsMapsComponent } from './assets-maps.component';

describe('AssetsMapsComponent', () => {
  let component: AssetsMapsComponent;
  let fixture: ComponentFixture<AssetsMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetsMapsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
