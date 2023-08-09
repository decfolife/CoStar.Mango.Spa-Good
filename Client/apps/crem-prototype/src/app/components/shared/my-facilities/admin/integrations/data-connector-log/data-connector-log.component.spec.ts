import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataConnectorLogComponent } from './data-connector-log.component';

describe('DataConnectorLogComponent', () => {
  let component: DataConnectorLogComponent;
  let fixture: ComponentFixture<DataConnectorLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataConnectorLogComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataConnectorLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
