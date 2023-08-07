import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtlFormItemListComponent } from './etl-form-item-list.component';

describe('EtlFormItemListComponent', () => {
  let component: EtlFormItemListComponent;
  let fixture: ComponentFixture<EtlFormItemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EtlFormItemListComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtlFormItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
