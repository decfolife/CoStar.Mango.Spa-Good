import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpageComponent } from './list-page.component';

describe('listpageComponent', () => {
  let component: ListpageComponent;
  let fixture: ComponentFixture<ListpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListpageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
