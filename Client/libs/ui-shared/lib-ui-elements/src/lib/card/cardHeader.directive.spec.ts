import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardHeaderDirective } from './cardHeader.directive';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'crem-my-test-component',
    template: `<div *cardHeader="true"  data-testid="div"></div>`
  })
  class TestComponent {}

describe('CardHeaderDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let div: HTMLDivElement
    

  beforeEach(() => {
     TestBed.configureTestingModule({
      declarations: [TestComponent, CardHeaderDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges()

    const test = fixture.debugElement.query(
        By.css(`[data-testid="div"]`)
      );

    div = test.nativeElement;
  });

  it('should be truthy' , () => {
    expect(fixture).toBeTruthy()
  })

});