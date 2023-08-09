import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataConnectorIntegrationsComponent } from './data-connector-integrations.component';

describe('DataConnectorIntegrationsComponent', () => {
  let component: DataConnectorIntegrationsComponent;
  let fixture: ComponentFixture<DataConnectorIntegrationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DataConnectorIntegrationsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataConnectorIntegrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
