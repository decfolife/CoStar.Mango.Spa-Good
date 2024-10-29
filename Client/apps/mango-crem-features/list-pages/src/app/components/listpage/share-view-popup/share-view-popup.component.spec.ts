import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareViewPopupComponent } from './share-view-popup.component';

describe('ShareViewPopupComponent', () => {
  let component: ShareViewPopupComponent;
  let fixture: ComponentFixture<ShareViewPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShareViewPopupComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareViewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
