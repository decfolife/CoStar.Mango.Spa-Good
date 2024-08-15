import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconModule } from '../icon';

export default {
  title: 'Components/Accordion',
  component: AccordionComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        IconModule
      ],
    }),
  ],

  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} as Meta<AccordionComponent>;

const Template: Story<AccordionComponent> = (args) => ({
  props: args,
  template: `<crem-accordion
    [id]="id"
    [isOpen]="isOpen"
    [title]="title"
    [contentPadding]="contentPadding"
    [subTitle]="subTitle"
    >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </crem-accordion>`
});

export const Default = Template.bind({});
Default.args = {
  id: "accordion",
  isOpen: true,
  title: "Accordion",
  subTitle: 'Test 2 complete | Test 3 incomplete',
  contentPadding: true
};