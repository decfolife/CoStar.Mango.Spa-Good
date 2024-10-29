import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRouAssetComponent } from './edit-rou-asset.component';

describe('EditRouAssetComponent', () => {
  let component: EditRouAssetComponent;
  let fixture: ComponentFixture<EditRouAssetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditRouAssetComponent],
    });
    fixture = TestBed.createComponent(EditRouAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
