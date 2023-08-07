import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostarImagesComponent } from './costar-images.component';

describe('CostarImagesComponent', () => {
  let component: CostarImagesComponent;
  let fixture: ComponentFixture<CostarImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CostarImagesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostarImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
