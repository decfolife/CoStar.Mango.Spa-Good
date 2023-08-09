import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CremProjectsComponent } from './crem-projects.component';

describe('CremProjectsComponent', () => {
  let component: CremProjectsComponent;
  let fixture: ComponentFixture<CremProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CremProjectsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CremProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
