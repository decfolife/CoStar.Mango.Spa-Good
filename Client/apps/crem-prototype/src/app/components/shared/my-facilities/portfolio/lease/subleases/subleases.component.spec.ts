import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubleasesComponent } from './subleases.component';

describe('SubleasesComponent', () => {
  let component: SubleasesComponent;
  let fixture: ComponentFixture<SubleasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SubleasesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubleasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
