import { provideMockStore } from '@ngrx/store/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmulateUserPopupComponent } from './emulate-user-popup.component';
import { MatDialogRef } from '@angular/material/dialog';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { ButtonModule, ModalModule } from '@mango/ui-shared/lib-ui-elements';

describe('EmulateUserPopupComponent', () => {
  let component: EmulateUserPopupComponent;
  let fixture: ComponentFixture<EmulateUserPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonModule, ModalModule],
      declarations: [EmulateUserPopupComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {},
        },
        provideMockStore({}),
        MangoAppFacade,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmulateUserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
