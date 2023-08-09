import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtlTemplatesComponent } from './etl-templates.component';

describe('EtlTemplatesComponent', () => {
  let component: EtlTemplatesComponent;
  let fixture: ComponentFixture<EtlTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EtlTemplatesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtlTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
