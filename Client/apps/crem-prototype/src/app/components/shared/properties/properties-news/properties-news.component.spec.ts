import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesNewsComponent } from './properties-news.component';

describe('PropertiesNewsComponent', () => {
  let component: PropertiesNewsComponent;
  let fixture: ComponentFixture<PropertiesNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PropertiesNewsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
