import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingListpageComponent } from './accounting-listpage.component';

describe('AccountingListpageComponent', () => {
  let component: AccountingListpageComponent;
  let fixture: ComponentFixture<AccountingListpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountingListpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingListpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
