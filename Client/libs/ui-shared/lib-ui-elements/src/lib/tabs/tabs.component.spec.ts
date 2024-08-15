import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CremTabItemComponent } from './tab-item.component';
import { CremTabsComponent } from './tabs.component';

@Component({
  selector: 'crem-tabs-test',
  standalone: true,
  imports: [
    CremTabsComponent,
    CremTabItemComponent
  ],
  template: `
  <crem-tabs #tabsComponent>
  <crem-tab-item title='Tab 1' id="tab1" #tab1>
    <h2>Tab 1</h2>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </crem-tab-item>
  <crem-tab-item title='Tab 2' id="tab2" #tab2>
    <h2>Tab 2</h2>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </crem-tab-item>
  <crem-tabs>
  `,
})
class TabsTestWrapperComponent {
  @ViewChild('tabsComponent') tabsComponent: CremTabsComponent
}

describe('Tabs component', () => {
  let wrapperComponent: TabsTestWrapperComponent;
  let tabsComponent: CremTabsComponent
  let fixture: ComponentFixture<TabsTestWrapperComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CremTabsComponent,
        CremTabItemComponent,
        TabsTestWrapperComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TabsTestWrapperComponent);
    wrapperComponent = fixture.componentInstance;
    fixture.detectChanges();
    tabsComponent = wrapperComponent.tabsComponent
  });

  it('should create', () => {
    expect(wrapperComponent).toBeTruthy();
  });

  it('should have the first tab selected by default', () => {
    expect(tabsComponent.selectedTabIndex).toBe(0)
  })
});
