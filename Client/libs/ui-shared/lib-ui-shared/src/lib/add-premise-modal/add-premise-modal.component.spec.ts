import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPremiseModalComponent } from './add-premise-modal.component';

describe('AddPremiseModalComponent', () => {
  let component: AddPremiseModalComponent;
  let fixture: ComponentFixture<AddPremiseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddPremiseModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPremiseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
