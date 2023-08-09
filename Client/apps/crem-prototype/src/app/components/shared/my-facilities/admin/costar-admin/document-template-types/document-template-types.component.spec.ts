import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTemplateTypesComponent } from './document-template-types.component';

describe('DocumentTemplateTypesComponent', () => {
  let component: DocumentTemplateTypesComponent;
  let fixture: ComponentFixture<DocumentTemplateTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentTemplateTypesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentTemplateTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
