import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CremAComponent } from './crem-a.component';

describe('CremAComponent', () => {
  let component: CremAComponent;
  let fixture: ComponentFixture<CremAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CremAComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CremAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
