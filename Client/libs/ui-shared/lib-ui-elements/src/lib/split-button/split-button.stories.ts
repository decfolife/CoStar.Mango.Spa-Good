import { CommonModule } from '@angular/common';
import {
  moduleMetadata,
  StoryObj,
  Meta,
  argsToTemplate,
} from '@storybook/angular';
import { SplitButtonComponent } from './split-button.component';
import { ButtonModule } from '../button/button.module';

const meta: Meta<SplitButtonComponent> = {
  component: SplitButtonComponent,
  title: 'Components/Split Button *',
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ButtonModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<SplitButtonComponent>;

export const Default: Story = {
  args: {
    text: 'Split Button',
    icon: 'faCaretDown',
    color: 'primary',
    btnStyle: 'flat',
    dropdownPosition: 'right',
    disabled: false,
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
  render: (args: SplitButtonComponent) => ({
    props: args,
    template: `<crem-split-button ${argsToTemplate(args)}></crem-split-button>`,
  }),
};

export const SplitButtonOnRight: Story = {
  args: {
    text: 'Split Button',
    icon: 'faCaretDown',
    color: 'primary',
    btnStyle: 'flat',
    dropdownPosition: 'left',
    disabled: false,
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
  render: (args: SplitButtonComponent) => ({
    props: args,
    template: `<crem-split-button style="float:right;" ${argsToTemplate(
      args
    )}></crem-split-button>`,
  }),
};

export const Disabled: Story = {
  args: {
    text: 'Split Button Disabled',
    icon: 'faCaretDown',
    color: 'primary',
    btnStyle: 'flat',
    dropdownPosition: 'left',
    disabled: true,
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
  render: (args: SplitButtonComponent) => ({
    props: args,
    template: `<crem-split-button ${argsToTemplate(args)}></crem-split-button>`,
  }),
};
