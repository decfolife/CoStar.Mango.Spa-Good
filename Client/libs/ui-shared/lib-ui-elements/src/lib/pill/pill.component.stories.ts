import { NgStyle } from '@angular/common';
import {
  Meta,
  StoryObj,
  argsToTemplate,
  moduleMetadata,
} from '@storybook/angular';
import { CremPillComponent } from './pill.component';
export default {
  title: 'Components/Pill *',
  component: CremPillComponent,
  decorators: [
    moduleMetadata({
      imports: [NgStyle],
    }),
  ],
  argTypes: {},
} as Meta<CremPillComponent>;

type Story = StoryObj<CremPillComponent>;

export const Success: Story = {
  args: {
    text: 'Success Pill',
    type: 'success',
  },
  render: (args: CremPillComponent) => ({
    props: args,
    template: `
      <crem-pill ${argsToTemplate(args)} ><crem-pill>
      `,
  }),
};

export const SuccessFilled: Story = {
  args: {
    text: 'Success Pill : Filled',
    type: 'success-filled',
  },
  render: (args: CremPillComponent) => ({
    props: args,
    template: `
      <crem-pill ${argsToTemplate(args)} ><crem-pill>
      `,
  }),
};

export const Warning: Story = {
  args: {
    text: 'Warning Pill',
    type: 'warning',
  },
  render: (args: CremPillComponent) => ({
    props: args,
    template: `
      <crem-pill ${argsToTemplate(args)} ><crem-pill>
      `,
  }),
};

export const WarningFilled: Story = {
  args: {
    text: 'Warning Pill : Filled',
    type: 'warning-filled',
  },
  render: (args: CremPillComponent) => ({
    props: args,
    template: `
      <crem-pill ${argsToTemplate(args)} ><crem-pill>
      `,
  }),
};

export const Danger: Story = {
  args: {
    text: 'Danger Pill',
    type: 'danger',
  },
  render: (args: CremPillComponent) => ({
    props: args,
    template: `
      <crem-pill ${argsToTemplate(args)} ><crem-pill>
      `,
  }),
};

export const RedFilled: Story = {
  args: {
    text: 'Danger Pill : Filled',
    type: 'danger-filled',
  },
  render: (args: CremPillComponent) => ({
    props: args,
    template: `
      <crem-pill ${argsToTemplate(args)} ><crem-pill>
      `,
  }),
};

export const Basic: Story = {
  args: {
    text: 'Basic Pill',
    type: 'basic',
  },
  render: (args: CremPillComponent) => ({
    props: args,
    template: `
      <crem-pill ${argsToTemplate(args)} ><crem-pill>
      `,
  }),
};

export const Disabled: Story = {
  args: {
    text: 'Disabled Pill',
    type: 'disabled',
  },
  render: (args: CremPillComponent) => ({
    props: args,
    template: `
      <crem-pill ${argsToTemplate(args)} ><crem-pill>
      `,
  }),
};
