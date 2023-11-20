import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsDetailSectionComponent } from './events-detail-section.component';

describe('EventsDetailSectionComponent', () => {
  let component: EventsDetailSectionComponent;
  let fixture: ComponentFixture<EventsDetailSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventsDetailSectionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventsDetailSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
