import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MtmComponent } from './mtm.component';

describe('MtmComponent', () => {
  let component: MtmComponent;
  let fixture: ComponentFixture<MtmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MtmComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
