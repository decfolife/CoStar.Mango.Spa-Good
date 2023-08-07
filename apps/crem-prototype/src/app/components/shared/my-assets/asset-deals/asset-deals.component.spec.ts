import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetDealsComponent } from './asset-deals.component';

describe('AssetDealsComponent', () => {
  let component: AssetDealsComponent;
  let fixture: ComponentFixture<AssetDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetDealsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
