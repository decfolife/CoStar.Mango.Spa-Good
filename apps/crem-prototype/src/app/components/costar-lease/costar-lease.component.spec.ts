import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostarLeaseComponent } from './costar-lease.component';

describe('CostarLeaseComponent', () => {
  let component: CostarLeaseComponent;
  let fixture: ComponentFixture<CostarLeaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CostarLeaseComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostarLeaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
