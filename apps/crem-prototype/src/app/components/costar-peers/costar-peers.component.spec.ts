import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostarPeersComponent } from './costar-peers.component';

describe('CostarPeersComponent', () => {
  let component: CostarPeersComponent;
  let fixture: ComponentFixture<CostarPeersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CostarPeersComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostarPeersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
