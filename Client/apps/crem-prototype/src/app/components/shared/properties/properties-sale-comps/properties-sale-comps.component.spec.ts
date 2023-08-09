import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesSaleCompsComponent } from './properties-sale-comps.component';

describe('PropertiesSaleCompsComponent', () => {
  let component: PropertiesSaleCompsComponent;
  let fixture: ComponentFixture<PropertiesSaleCompsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PropertiesSaleCompsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesSaleCompsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
