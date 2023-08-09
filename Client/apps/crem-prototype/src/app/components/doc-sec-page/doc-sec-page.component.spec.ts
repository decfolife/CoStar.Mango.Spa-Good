import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocSecPageComponent } from './doc-sec-page.component';

describe('DocSecPageComponent', () => {
  let component: DocSecPageComponent;
  let fixture: ComponentFixture<DocSecPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocSecPageComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocSecPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
