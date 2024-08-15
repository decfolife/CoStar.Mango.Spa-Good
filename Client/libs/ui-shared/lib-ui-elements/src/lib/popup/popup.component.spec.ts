import { CremPopupComponent } from './popup.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('CremPopupComponent', () => {
  let component: CremPopupComponent;
  let fixture: ComponentFixture<CremPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CremPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CremPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#closePopup', () => {
    jest.spyOn(component, 'closePopup');
    component.closePopup();
    expect(component.visible).toBe(false);
  });

  xit('#onCloseClick', () => {
    const onCloseSpy = jest.spyOn(component.close, 'emit');
    component.onCloseClick();
    expect(onCloseSpy).toHaveBeenCalledWith('Cancel');
  });


  it('#onSaveClick', () => {
    const onSaveSpy = jest.spyOn(component.save, 'emit');
    component.onSaveClick();
    expect(onSaveSpy).toHaveBeenCalledWith(true);
  });

  it('#onApplyClick', () => {
    const onApplySpy = jest.spyOn(component.apply, 'emit');
    component.onApplyClick();
    expect(onApplySpy).toHaveBeenCalledWith(true);
  });
});
