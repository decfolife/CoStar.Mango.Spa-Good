import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DashboardService } from '../../services/dashboard.service';

import { AccountingDashboardComponent } from './accounting-dashboard.component';
import { DashboardModule } from './accounting-dashboard.module';

describe('AccountingDashboardComponent', () => {
  let component: AccountingDashboardComponent;
  let fixture: ComponentFixture<AccountingDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingDashboardComponent ],
      imports: [DashboardModule],
      providers: [ DashboardService, HttpClient, HttpHandler ] 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});