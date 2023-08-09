import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesLeaseCompsComponent } from './properties-lease-comps.component';

describe('PropertiesLeaseCompsComponent', () => {
  let component: PropertiesLeaseCompsComponent;
  let fixture: ComponentFixture<PropertiesLeaseCompsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PropertiesLeaseCompsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesLeaseCompsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
