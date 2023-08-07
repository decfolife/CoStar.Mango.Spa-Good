import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovePortfolioObjectsComponent } from './move-portfolio-objects.component';

describe('MovePortfolioObjectsComponent', () => {
  let component: MovePortfolioObjectsComponent;
  let fixture: ComponentFixture<MovePortfolioObjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovePortfolioObjectsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovePortfolioObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
