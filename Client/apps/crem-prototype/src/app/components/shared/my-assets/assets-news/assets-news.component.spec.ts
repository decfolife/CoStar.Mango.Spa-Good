import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsNewsComponent } from './assets-news.component';

describe('AssetsNewsComponent', () => {
  let component: AssetsNewsComponent;
  let fixture: ComponentFixture<AssetsNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetsNewsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
