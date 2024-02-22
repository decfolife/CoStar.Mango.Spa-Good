import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportTeamComponent } from './import-team.component';

describe('ImportTeamComponent', () => {
  let component: ImportTeamComponent;
  let fixture: ComponentFixture<ImportTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImportTeamComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
