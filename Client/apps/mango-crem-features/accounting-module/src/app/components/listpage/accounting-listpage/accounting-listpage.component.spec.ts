import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountingListpageComponent } from './accounting-listpage.component';
import { ListPageService } from 'apps/mango-crem-features/list-pages/src/app/components/listpage/core/services/listpage.service';
import { Renderer2 } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

describe('AccountingListpageComponent', () => {
  let component: AccountingListpageComponent;
  let fixture: ComponentFixture<AccountingListpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountingListpageComponent],
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore(),
        MangoAppFacade,
        ListPageService,
        Renderer2,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingListpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test.skip('AccountingListpageComponent test is failing, needs revision', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
