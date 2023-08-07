import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentStoreComponent } from './document-store.component';

describe('DocumentStoreComponent', () => {
  let component: DocumentStoreComponent;
  let fixture: ComponentFixture<DocumentStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentStoreComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
