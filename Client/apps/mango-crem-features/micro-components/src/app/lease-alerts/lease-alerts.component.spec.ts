import { TestBed } from '@angular/core/testing';
import { LeaseAlertsComponent } from './lease-alerts.component';

describe('LeaseAlertsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeaseAlertsComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(LeaseAlertsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'mango-crem-features-alerts'`, () => {
    const fixture = TestBed.createComponent(LeaseAlertsComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('mango-crem-features-alerts');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(LeaseAlertsComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain(
      'Welcome to mango-crem-features-alerts!'
    );
  });
});
