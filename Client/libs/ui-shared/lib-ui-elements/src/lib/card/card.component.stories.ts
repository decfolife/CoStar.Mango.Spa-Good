import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CardComponent } from './card.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CardHeaderDirective } from './cardHeader.directive';
import { DropdownModule } from '../dropdown';
import { IconModule } from '../icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { Dropdown } from '@mango/data-models/lib-data-models';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Components/Card',
  component: CardComponent,
  decorators: [
    moduleMetadata({
      declarations: [CardHeaderDirective],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        MatCardModule,
        MatMenuModule,
        MatDialogModule,
        MatIconModule,
        SearchModule,
        DropdownModule,
        IconModule
      ],
    }),
  ],
} as Meta<CardComponent>;

const Template: Story<CardComponent> = (args: CardComponent) => ({
  props: args,
  template: `<crem-card 
  [title]="title"
  [id]="id"
  [subtitle]="subtitle"
  [customDropdownMenu]="customDropdownMenu"
  [filterInitialValue]="filterInitialValue"
  [showCustomHeader]="showCustomHeader"
  [showFilterClearButton]="showFilterClearButton"
  [filterData]="filterData"
  [moreOptions]="moreOptions"
  [pendoTitleId]="pendoTitleId"
  [counter]="counter"
  [exportId]="exportId"
  [dropDisplay]="dropDisplay"
  [dropValue]="dropValue"
  [dropdownPlaceholder]="dropdownPlaceholder"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  <div customHeader>Custom header</div>
  </crem-card>`
});


const filterData: Dropdown[] = [
  { displayKey: "Last 30 days", valueKey: "30_days" },
  { displayKey: "Last 60 days", valueKey: "60_days" },
  { displayKey: "Last 90 days", valueKey: "90_days" },
  { displayKey: "Since Last Login", valueKey: "since_last_login" },
]
export const Primary = Template.bind({});
Primary.args = {
  id: '',
  title: 'Card Title',
  subtitle: '(Subtitle)',
  customDropdownMenu: false,
  filterInitialValue: { displayKey: "Filter 1", valueKey: "v1" },
  showCustomHeader: true,
  showFilterClearButton: false,
  filterData: null,
  moreOptions: null,
  pendoTitleId: '',
  counter: null,
  exportId: '',
  dropDisplay: 'test',
  dropValue: 'te',
  dropdownPlaceholder: 'tttt',
};
