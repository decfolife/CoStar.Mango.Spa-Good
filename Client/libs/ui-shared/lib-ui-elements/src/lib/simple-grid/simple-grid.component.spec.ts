import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SimpleGridModule } from './simple-grid.module';
import { SimpleGridComponent } from './simple-grid.component';

describe('SimpleGridComponent', () => {
  let component: SimpleGridComponent;
  let fixture: ComponentFixture<SimpleGridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleGridComponent ],
      imports: [ SimpleGridModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
