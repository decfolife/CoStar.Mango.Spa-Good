import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostarSearchComponent } from './costar-search.component';

describe('CostarSearchComponent', () => {
  let component: CostarSearchComponent;
  let fixture: ComponentFixture<CostarSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CostarSearchComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostarSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
