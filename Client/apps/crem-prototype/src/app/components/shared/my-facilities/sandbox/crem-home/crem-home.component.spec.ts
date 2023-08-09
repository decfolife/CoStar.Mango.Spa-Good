import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CremHomeComponent } from './crem-home.component';

describe('CremHomeComponent', () => {
  let component: CremHomeComponent;
  let fixture: ComponentFixture<CremHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CremHomeComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CremHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
