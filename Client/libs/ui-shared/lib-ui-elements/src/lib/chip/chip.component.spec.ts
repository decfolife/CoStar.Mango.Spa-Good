import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ChipModule } from './chip.module';
import { ChipComponent } from './chip.component';

describe('ChipComponent', () => {
  let component: ChipComponent;
  let fixture: ComponentFixture<ChipComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ChipComponent ],
      imports: [ ChipModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ChipComponent (crem-chip)', () => {
    expect(component).toBeTruthy();
  });

  it('#toggleAnimationOptions should set withAnimationOptionsVisible to TRUE', () => {
    component.withAnimationOptionsVisible = false
    component.toggleAnimationOptions()
    expect(component.withAnimationOptionsVisible).toBe(true);
  });

  it('#toggleAnimationOptions should set withAnimationOptionsVisible to FALSE', () => {
    component.withAnimationOptionsVisible = true
    component.toggleAnimationOptions()
    expect(component.withAnimationOptionsVisible).toBe(false);
  });

  it('ngOnInit should set chipColor when chipStatus is costar', () => {
    component.chipStatus = 'costar'
    component.ngOnInit()
    expect(component.chipColor).toEqual('color-brand-primary');
  });

  it('ngOnInit should set chipColor when chipStatus is completeStatus', () => {
    component.chipStatus = 'completeStatus'
    component.ngOnInit()
    expect(component.chipColor).toEqual('color-neutral-medium');
  });

  it('ngOnInit should set chipColor when chipStatus is upcomingStatus', () => {
    component.chipStatus = 'upcomingStatus'
    component.ngOnInit()
    expect(component.chipColor).toEqual('color-brand-primary-light');
  });

  it('ngOnInit should set chipColor when chipStatus is overdueStatus', () => {
    component.chipStatus = 'overdueStatus'
    component.ngOnInit()
    expect(component.chipColor).toEqual('color-brand-red');
  });

  it('ngOnInit should set chipColor when chipStatus is activeStatus', () => {
    component.chipStatus = 'activeStatus'
    component.ngOnInit()
    expect(component.chipColor).toEqual('color-brand-green');
  });

  
  it('ngOnInit should set chipColor when chipStatus is daysStatus', () => {
    component.chipStatus = 'daysStatus'
    component.ngOnInit()
    expect(component.chipColor).toEqual('color-brand-yellow');
  });
});
