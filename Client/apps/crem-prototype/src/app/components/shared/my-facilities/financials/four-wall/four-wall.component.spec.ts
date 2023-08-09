import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FourWallComponent } from './four-wall.component';

describe('FourWallComponent', () => {
  let component: FourWallComponent;
  let fixture: ComponentFixture<FourWallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FourWallComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
