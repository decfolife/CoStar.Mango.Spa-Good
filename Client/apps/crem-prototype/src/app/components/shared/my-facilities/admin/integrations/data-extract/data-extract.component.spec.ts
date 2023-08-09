import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataExtractComponent } from './data-extract.component';

describe('DataExtractComponent', () => {
  let component: DataExtractComponent;
  let fixture: ComponentFixture<DataExtractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataExtractComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataExtractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
