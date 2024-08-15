import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MASTER_DETAIL_MOCK } from '../../../../../data-models/lib-data-models/src/lib/mocks/master-detail.component.mocks'
import { MasterDetailComponent } from './master-detail.component';

describe('MasterDetailComponent', () => {
  let component: MasterDetailComponent;
  let fixture: ComponentFixture<MasterDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterDetailComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MasterDetailComponent);
    component = fixture.componentInstance;
    component.content = MASTER_DETAIL_MOCK
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
