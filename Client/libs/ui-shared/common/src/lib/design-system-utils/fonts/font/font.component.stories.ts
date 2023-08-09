import { Meta, Story } from '@storybook/angular';
import { DesignSystemFontToken } from './font.component';

export default {
  title: 'Styling/Internal Utilities/Font',
  component: DesignSystemFontToken,
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} as Meta<DesignSystemFontToken>;

const Template: Story<DesignSystemFontToken> = (args: DesignSystemFontToken) => ({
  props: args,
});

export const Base = Template.bind({});

Base.args = {
  fontDetails: {
    name: 'Base',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
    size: '16px',
    root: '1rem',
    lineHeight: '1.5',
  },
  examples: [
    {
      weight: 'Normal',
      example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
    },
    {
      weight: 'Medium',
      example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
    },
    {
      weight: 'Bold',
      example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
    },
  ],
};