import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { SearchComponent } from './search.component';


export default {
  title: 'Components/Search',
  component: SearchComponent,
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        MatInputModule,
        MatIconModule,
        MatFormFieldModule,
      ],
    }),
  ]
} as Meta<SearchComponent>;

const Template: Story<SearchComponent> = (args: SearchComponent) => ({
  props: args
});

export const Default = Template.bind({});
Default.args = {
  label: "Label",
  placeholder: "Placeholder",
  hint: "Hint",
  showLabel: true,
  disabled: false,
  required: true,
  optional: false,
};
