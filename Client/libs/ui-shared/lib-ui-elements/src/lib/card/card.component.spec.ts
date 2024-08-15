import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { CardHeaderDirective } from './cardHeader.directive';
import { MatCardModule } from '@angular/material/card';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [MatCardModule],
        declarations: [CardComponent, CardHeaderDirective],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create CardComponent(crem-card)', () => {
    expect(component).toBeTruthy();
  });

  it('#selected should emit selectedFilter event with param value', () => {
    const selectedFilterSpy = jest.spyOn(component.selectedFilter, 'emit');
    component.selected('selected value')

    expect(selectedFilterSpy).toHaveBeenCalledWith('selected value');
  });

  it('#toggleExpanded should set isExpanded to true and emit expandDataGrid event with isExpanded value when isExpanded is false', () => {
    const expandDataGridrSpy = jest.spyOn(component.expandDataGrid, 'emit');
    component.isExpanded = false
    component.toggleExpanded()
    
    expect(component.isExpanded).toBe(true);
    expect(expandDataGridrSpy).toHaveBeenCalledWith(true);
  });

  it('#toggleExpanded should set isExpanded to false and emit expandDataGrid event with isExpanded value when isExpanded is true', () => {
    const expandDataGridrSpy = jest.spyOn(component.expandDataGrid, 'emit');
    component.isExpanded = true
    component.toggleExpanded()
    
    expect(component.isExpanded).toBe(false);
    expect(expandDataGridrSpy).toHaveBeenCalledWith(false);
  });

  it('#exportGridData should emit exportDataGrid event as true and  should emit exportGridId event with exportId', () => {
    const exportDataGridSpy = jest.spyOn(component.exportDataGrid, 'emit');
    const exportGridIdSpy = jest.spyOn(component.exportGridId, 'emit');
    component.exportId = '1'
    component.exportGridData()

    expect(exportDataGridSpy).toHaveBeenCalledWith(true);
    expect(exportGridIdSpy).toHaveBeenCalledWith('1');
  });

  it('#hideGridLabels should emit hideLabels event as true', () => {
    const hideLabelsSpy = jest.spyOn(component.hideLabels, 'emit');
    component.hideGridLabels()

    expect(hideLabelsSpy).toHaveBeenCalledWith(true);
  });

  it('#toggleLegend should set legendVisible to true and emit toggleLegendEvent event as true when legendVisible is false', () => {
    const toggleLegendEventSpy = jest.spyOn(component.toggleLegendEvent, 'emit');
    component.legendVisible = false
    component.toggleLegend()
    
    expect(component.legendVisible).toBe(true);
    expect(toggleLegendEventSpy).toHaveBeenCalledWith(true);
  });

  it('#toggleLegend should set legendVisible to false and emit toggleLegendEvent event as true when legendVisible is true', () => {
    const toggleLegendEventSpy = jest.spyOn(component.toggleLegendEvent, 'emit');
    component.legendVisible = true
    component.toggleLegend()
    
    expect(component.legendVisible).toBe(false);
    expect(toggleLegendEventSpy).toHaveBeenCalledWith(true);
  });
});
