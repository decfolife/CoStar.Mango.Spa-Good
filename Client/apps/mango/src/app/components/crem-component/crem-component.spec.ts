import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ProjectsDashboardLeftNavService } from '@micro-components/services/projects-dashboard-left-nav.service';
import { CremComponent } from './crem-component';
import { BookmarksService } from '@micro-components/services/bookmarks.service';
import { provideMockStore } from '@ngrx/store/testing';
import { MangoAppFacade } from '../../+state/app/app.facade';
import { MatDialogModule } from '@angular/material/dialog';

describe('CremComponent', () => {
  let component: CremComponent;
  let fixture: ComponentFixture<CremComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CremComponent],
      imports: [
        HttpClientTestingModule,
        MatDialogModule
      ],
      providers: [ProjectsDashboardLeftNavService, BookmarksService, MangoAppFacade, provideMockStore()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CremComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
