import { Meta, Story } from '@storybook/angular';
import { DesignSystemFontsToken } from './fonts.component';

export default {
  title: 'Documentation/Styling/Internal Utilities/Fonts',
  component: DesignSystemFontsToken,
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} as Meta<DesignSystemFontsToken>;

const Template: Story<DesignSystemFontsToken> = (args: DesignSystemFontsToken) => ({
  props: args,
});

// BODY
export const Body = Template.bind({});
Body.args = {
  fonts: [
    // Lead
    {
      fontDetails: {
        name: 'Lead',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
        size: '16px',
        root: '1.125rem',
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
    },
    // Body
    {
      fontDetails: {
        name: 'Body',
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
    },
  ]
};

// Headers
export const Headers = Template.bind({});
Headers.args = {
  fonts: [
    // H1
    {
      fontDetails: {
        name: 'H1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
        size: '28px',
        root: '1.75rem',
        lineHeight: '2.0625rem',
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
    },
    // H2
    {
      fontDetails: {
        name: 'H2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
        size: '20px',
        root: '1.25rem',
        lineHeight: '1.4375rem',
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
    },
    // H3
    {
      fontDetails: {
        name: 'H3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
        size: '18px',
        root: '1.25rem',
        lineHeight: '1.3125rem',
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
    },
    // H4
    {
      fontDetails: {
        name: 'H4',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
        size: '16px',
        root: '1rem',
        lineHeight: '1.3125rem',
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
    },
    // EYEBROW
    {
      fontDetails: {
        name: 'Eyebrow',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
        size: '16px',
        root: '1rem',
        lineHeight: '1.3125rem',
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
    },
    // DISPLAY-1
    {
      fontDetails: {
        name: 'Display-1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
        size: '42px',
        root: '2.625rem',
        lineHeight: '3',
      },
      examples: [
        {
          weight: 'Normal',
          example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        },
        {
          weight: 'Medium',
          example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        },
        {
          weight: 'Bold',
          example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        },
      ],
    },
    // DISPLAY-2
    {
      fontDetails: {
        name: 'Display-2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
        size: '36px',
        root: '2.25rem',
        lineHeight: '2.625rem',
      },
      examples: [
        {
          weight: 'Normal',
          example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        },
        {
          weight: 'Medium',
          example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        },
        {
          weight: 'Bold',
          example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        },
      ],
    },
    // DISPLAY-3
    {
      fontDetails: {
        name: 'Display-3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
        size: '32px',
        root: '2.25rem',
        lineHeight: '2.625rem',
      },
      examples: [
        {
          weight: 'Normal',
          example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        },
        {
          weight: 'Medium',
          example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        },
        {
          weight: 'Bold',
          example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        },
      ],
    },
  ]
};