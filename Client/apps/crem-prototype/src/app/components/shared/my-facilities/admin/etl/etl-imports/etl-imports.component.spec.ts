import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtlImportsComponent } from './etl-imports.component';

describe('EtlImportsComponent', () => {
  let component: EtlImportsComponent;
  let fixture: ComponentFixture<EtlImportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EtlImportsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtlImportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
