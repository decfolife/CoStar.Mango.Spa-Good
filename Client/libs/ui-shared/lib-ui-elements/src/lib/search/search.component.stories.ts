import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchOption } from '@mango/data-models/lib-data-models';
import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { IconModule } from '../icon';
import { SearchComponent } from './search.component';
import { InputComponent } from '../input';

export default {
  title: 'Components/Search *',
  component: SearchComponent,
  argTypes: {
    searchOption: { control: 'radio', options: SearchOption },
  },
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        IconModule,
        InputComponent
      ],
    }),
  ]
} as Meta<SearchComponent>;

const Template: Story<SearchComponent> = (args: SearchComponent) => ({
  props: args
});

export const Default = Template.bind({});
Default.args = {
  showLabel: false,
  label: "Please Input search text",
  placeholder: "Search text",
  required: false,
  disabled: false,
  showInfo: false,
  debounceTime: 500,
  searchOption: SearchOption.MAGNIFYING_GLASS,
};
