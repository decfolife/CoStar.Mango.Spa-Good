import { Meta, Story } from '@storybook/angular';
import { DesignSystemPalette } from './palette.component';

export default {
  title: 'Styling/Internal Utilities/Palette',
  component: DesignSystemPalette,
  argTypes: {
    palette: {
      control: 'object',
    }
  },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} as Meta<DesignSystemPalette>;

const Template: Story<DesignSystemPalette> = (args: DesignSystemPalette) => ({
  props: args,
});

// PRIMARY
export const Primary = Template.bind({});
Primary.args = {
  palette: [
    // BASE
    {
      color: 'primary',
      wcagColor: 'light',
      wcagContrast: 'AAA 11.2:1',
      wcagDescription: 'light',
      name: 'Base',
      description: '#1B3A6E',
      examples: `
        @include costar(background-color, primary);
        @include costar(color, light);`,
    },
    // LIGHT
    {
      color: 'primary-light',
      wcagColor: 'light',
      wcagContrast: 'AA 6.8:1',
      wcagDescription: 'light',
      name: 'Light',
      description: '#0559B3',
      examples: `
        @include costar(background-color, primary-light);
        @include costar(color, light);`,
    },
    {
      color: 'primary-lighter',
      wcagColor: 'primary-darkest',
      wcagContrast: 'AAA 7.1:1',
      wcagDescription: 'primary-darkest',
      name: 'Lighter',
      description: '#779ede',
      examples: `
        @include costar(background-color, primary-lighter);
        @include costar(color, primary-darkest);`,
    },
    {
      color: 'primary-lightest',
      wcagColor: 'primary',
      wcagContrast: 'AAA 7.1:1',
      wcagDescription: 'primary',
      name: 'Lightest',
      description: '#E0EAF4',
      examples: `
        @include costar(background-color, primary-lightest);
        @include costar(color, primary);`,
    },
    // DARK
    {
      color: 'primary-dark',
      wcagColor: 'light',
      wcagContrast: 'AAA 13.2:1',
      wcagDescription: 'light',
      name: 'Dark',
      description: '#162f5a',
      examples: `
        @include costar(background-color, primary-dark);
        @include costar(color, light);`,
    },
    {
      color: 'primary-darker',
      wcagColor: 'light',
      wcagContrast: 'AAA 17.4:1',
      wcagDescription: 'light',
      name: 'Darker',
      description: '#0c1a31',
      examples: `
        @include costar(background-color, primary-darker);
        @include costar(color, light);`,
    },
    {
      color: 'primary-darkest',
      wcagColor: 'light',
      wcagContrast: 'AAA 19.2:1',
      wcagDescription: 'light',
      name: 'Darkest',
      description: '#070f1c',
      examples: `
        @include costar(background-color, primary-light);
        @include costar(color, light);`,
    },
  ]
};

// SECONDARY
export const Secondary = Template.bind({});
Secondary.args = {
  palette: [
    // BASE
    {
      color: 'secondary',
      wcagColor: 'dark',
      wcagContrast: 'AA 5.5:1',
      wcagDescription: 'dark',
      name: 'Base',
      description: '#ec4a08',
      examples: `
        @include costar(background-color, secondary);
        @include costar(color, dark);`,
    },
    // LIGHT
    {
      color: 'secondary-light',
      wcagColor: 'secondary-darkest',
      wcagContrast: 'AAA 7.1:1',
      wcagDescription: 'secondary-darkest',
      name: 'Light',
      description: '#f8692f',
      examples: `
        @include costar(background-color, secondary-light);
        @include costar(color, secondary-darkest);`,
    },
    {
      color: 'secondary-lighter',
      wcagColor: 'dark',
      wcagContrast: 'AAA 9:1',
      wcagDescription: 'dark',
      name: 'Lighter',
      description: '#fa8d60',
      examples: `
        @include costar(background-color, secondary-lighter);
        @include costar(color, dark);`,
    },
    {
      color: 'secondary-lightest',
      wcagColor: 'secondary-darkest',
      wcagContrast: 'AAA 9.7:1',
      wcagDescription: 'secondary-darkest',
      name: 'Lightest',
      description: '#fdd4c3',
      examples: `
        @include costar(background-color, secondary-lightest);
        @include costar(color, secondary-darkest);`,
    },
    // DARK
    {
      color: 'secondary-dark',
      wcagColor: 'light',
      wcagContrast: 'AA 5.6:1',
      wcagDescription: 'light',
      name: 'Dark',
      description: '#bb3b06',
      examples: `
        @include costar(background-color, secondary-dark);
        @include costar(color, light);`,
    },
    {
      color: 'secondary-darker',
      wcagColor: 'light',
      wcagContrast: 'AAA 8.7:1',
      wcagDescription: 'light',
      name: 'Darker',
      description: '#892b05',
      examples: `
        @include costar(background-color, secondary-darker);
        @include costar(color, light);`,
    },
    {
      color: 'secondary-darkest',
      wcagColor: 'light',
      wcagContrast: 'AAA 13.3:1',
      wcagDescription: 'light',
      name: 'Darkest',
      description: '#581c03',
      examples: `
        @include costar(background-color, secondary-light);
        @include costar(color, light);`,
    },
  ]
};

// NEUTRALS
export const Neutrals = Template.bind({});
Neutrals.args = {
  palette: [
    {
      color: 'background',
      wcagColor: 'gray02',
      wcagContrast: '19.26:1',
      wcagDescription: 'gray02',
      name: 'Background',
      description: '#F5F5F5',
      examples: `
        @include costar(background-color, background);
        @include costar(color, gray02);`,
    },
    {
      color: 'light',
      wcagColor: 'dark',
      wcagContrast: 'AA 4.95',
      wcagDescription: 'dark',
      name: 'Light',
      description: '#FFFFFF',
      examples: `
        @include costar(background-color, light);
        @include costar(color, dark);`,
    },
    {
      color: 'dark',
      wcagColor: 'light',
      wcagContrast: 'AA 21:1',
      wcagDescription: 'light',
      name: 'Dark',
      description: '#00000',
      examples: `
        @include costar(background-color, dark);
        @include costar(color, light);`,
    },
  ]
};

export const Grays = Template.bind({});
Grays.args = {
  palette: [
    {
      color: 'gray01',
      wcagColor: 'light',
      wcagContrast: 'AAA 11.5:1',
      wcagDescription: 'light',
      name: 'Gray 01',
      description: '#393939',
      examples: `
        @include costar(background-color, gray01);
        @include costar(color, light);`,
    },
    {
      color: 'gray02',
      wcagColor: 'light',
      wcagContrast: 'AAA 10.2:1',
      wcagDescription: 'light',
      name: 'Gray 02',
      description: '#414141',
      examples: `
        @include costar(background-color, gray02);
        @include costar(color, light);`,
    },
    {
      color: 'gray03',
      wcagColor: 'dark',
      wcagContrast: 'AAA 10.2:1',
      wcagDescription: 'dark',
      name: 'Gray 03',
      description: '#757575',
      examples: `
        @include costar(background-color, gray02);
        @include costar(color, dark);`,
    },
    {
      color: 'gray04',
      wcagColor: 'gray01',
      wcagContrast: 'AAA 7:1',
      wcagDescription: 'gray01',
      name: 'Gray 04',
      description: '#C8C8C8',
      examples: `
        @include costar(background-color, gray04);
        @include costar(color, gray01);`,
    },
    {
      color: 'gray05',
      wcagColor: 'gray01',
      wcagContrast: 'AAA 8.4:1',
      wcagDescription: 'gray01',
      name: 'Gray 05',
      description: '#dcdcdc',
      examples: `
        @include costar(background-color, gray05);
        @include costar(color, gray01);`,
    },
    {
      color: 'gray06',
      wcagColor: 'dark',
      wcagContrast: 'AAA 8.4:1',
      wcagDescription: 'dark',
      name: 'Gray 06',
      description: '#dcdcdc',
      examples: `
        @include costar(background-color, gray06);
        @include costar(color, dark);`,
    },
    {
      color: 'gray07',
      wcagColor: 'gray01',
      wcagContrast: 'AAA 11.2:1',
      wcagDescription: 'gray01',
      name: 'Gray 07',
      description: '#FBFBFB',
      examples: `
        @include costar(background-color, gray07);
        @include costar(color, gray01);`,
    },
  ]
};

// FEEDBACK SUCCESS
export const SystemFeedbackSuccess = Template.bind({});
SystemFeedbackSuccess.args = {
  palette: [
    // BASE
    {
      color: 'success',
      wcagColor: 'light',
      wcagContrast: 'AA 5.4:1',
      wcagDescription: 'light',
      name: 'Base',
      description: '#017B30',
      examples: `
        @include costar(background-color, success);
        @include costar(color, light);`,
    },
    // LIGHT
    {
      color: 'success-light',
      wcagColor: 'success-darkest',
      wcagContrast: 'AA 6.4:1',
      wcagDescription: 'success-darkest',
      name: 'Light',
      description: '#01ae44',
      examples: `
        @include costar(background-color, success-light);
        @include costar(color, success-darkest);`,
    },
    {
      color: 'success-lighter',
      wcagColor: 'success-darkest',
      wcagContrast: 'AAA 10.6:1',
      wcagDescription: 'success-darkest',
      name: 'Lighter',
      description: '#02e057',
      examples: `
        @include costar(background-color, success-lighter);
        @include costar(color, success-darkest);`,
    },
    {
      color: 'success-lightest',
      wcagColor: 'success-darkest',
      wcagContrast: 'AAA 14.2:1',
      wcagDescription: 'success-darkest',
      name: 'Lightest',
      description: '#4afe8f',
      examples: `
        @include costar(background-color, success-lightest);
        @include costar(color, success-darkest);`,
    },
    // DARK
    {
      color: 'success-dark',
      wcagColor: 'light',
      wcagContrast: 'AAA 10.8:1',
      wcagDescription: 'light',
      name: 'Dark',
      description: '#01481c',
      examples: `
        @include costar(background-color, success-dark);
        @include costar(color, light);`,
    },
    {
      color: 'success-darker',
      wcagColor: 'light',
      wcagContrast: 'AAA 14.8:1',
      wcagDescription: 'light',
      name: 'Darker',
      description: '#002f12',
      examples: `
        @include costar(background-color, success-darker);
        @include costar(color, light);`,
    },
    {
      color: 'success-darkest',
      wcagColor: 'light',
      wcagContrast: 'AAA 18.8:1',
      wcagDescription: 'light',
      name: 'Darkest',
      description: '#001609',
      examples: `
        @include costar(background-color, success-darkest);
        @include costar(color, light);`,
    },
  ]
};

// FEEDBACK INFO
export const SystemFeedbackInfo = Template.bind({});
SystemFeedbackInfo.args = {
  palette: [
    // BASE
    {
      color: 'info',
      wcagColor: 'dark',
      wcagContrast: 'AAA 7.2:1',
      wcagDescription: 'dark',
      name: 'Base',
      description: '#669bd1',
      examples: `
        @include costar(background-color, info);
        @include costar(color, dark);`,
    },
    // LIGHT
    {
      color: 'info-light',
      wcagColor: 'primary-darkest',
      wcagContrast: 'AAA 9.8:1',
      wcagDescription: 'primary-darkest',
      name: 'Light',
      description: '#8db5dd',
      examples: `
        @include costar(background-color, info-light);
        @include costar(color, primary-darkest);`,
    },
    {
      color: 'info-lighter',
      wcagColor: 'dark',
      wcagContrast: 'AAA 12.9:1',
      wcagDescription: 'dark',
      name: 'Lighter',
      description: '#b4cee9',
      examples: `
        @include costar(background-color, info-lighter);
        @include costar(color, dark);`,
    },
    {
      color: 'info-lightest',
      wcagColor: 'info-darkest',
      wcagContrast: 'AAA 10.1:1',
      wcagDescription: 'info-darkest',
      name: 'Lightest',
      description: '#dce8f4',
      examples: `
        @include costar(background-color, info-lightest);
        @include costar(color, info-darkest);`,
    },
    // DARK
    {
      color: 'info-dark',
      wcagColor: 'light',
      wcagContrast: 'AA 5:8:1',
      wcagDescription: 'light',
      name: 'Dark',
      description: '#3068a1',
      examples: `
        @include costar(background-color, info-dark);
        @include costar(color, light);`,
    },
    {
      color: 'info-darker',
      wcagColor: 'light',
      wcagContrast: 'AAA 8.5:1',
      wcagDescription: 'light',
      name: 'Darker',
      description: '#254f79',
      examples: `
        @include costar(background-color, info-darker);
        @include costar(color, light);`,
    },
    {
      color: 'info-darkest',
      wcagColor: 'light',
      wcagContrast: 'AAA 12.6:1',
      wcagDescription: 'light',
      name: 'Darkest',
      description: '#193552',
      examples: `
        @include costar(background-color, info-darkest);
        @include costar(color, light);`,
    },
  ]
};

// FEEDBACK WARNING
export const SystemFeedbackWarning = Template.bind({});
SystemFeedbackWarning.args = {
  palette: [
    // BASE
    {
      color: 'warning',
      wcagColor: 'dark',
      wcagContrast: 'AAA 8.5:1',
      wcagDescription: 'dark',
      name: 'Base',
      description: '#FFB400',
      examples: `
        @include costar(background-color, warning);
        @include costar(color, dark);`,
    },
    // LIGHT
    {
      color: 'warning-light',
      wcagColor: 'warning-darkest',
      wcagContrast: 'AAA 9.4:1',
      wcagDescription: 'warning-darkest',
      name: 'Light',
      description: '#ffc333',
      examples: `
        @include costar(background-color, warning-light);
        @include costar(color, warning-darkest);`,
    },
    {
      color: 'warning-lighter',
      wcagColor: 'warning-darkest',
      wcagContrast: 'AAA 10:1',
      wcagDescription: 'warning-darkest',
      name: 'Lighter',
      description: '#ffcb4d',
      examples: `
        @include costar(background-color, warning-lighter);
        @include costar(color, warning-darkest);`,
    },
    {
      color: 'warning-lightest',
      wcagColor: 'warning-darkest',
      wcagContrast: 'AAA 11.2:1',
      wcagDescription: 'warning-darkest',
      name: 'Lightest',
      description: '#ffda80',
      examples: `
        @include costar(background-color, warning-lightest);
        @include costar(color, warning-darkest);`,
    },
    // DARK
    {
      color: 'warning-dark',
      wcagColor: 'light',
      wcagContrast: 'AA 4.7:1',
      wcagDescription: 'light',
      name: 'Dark',
      description: '#996c00',
      examples: `
        @include costar(background-color, warning-dark);
        @include costar(color, light);`,
    },
    {
      color: 'warning-darker',
      wcagColor: 'light',
      wcagContrast: 'AAA 8.4:1',
      wcagDescription: 'light',
      name: 'Darker',
      description: '#664800',
      examples: `
        @include costar(background-color, warning-darker);
        @include costar(color, light);`,
    },
    {
      color: 'warning-darkest',
      wcagColor: 'light',
      wcagContrast: 'AAA 15.1:1',
      wcagDescription: 'light',
      name: 'Darkest',
      description: '#332400',
      examples: `
        @include costar(background-color, warning-darkest);
        @include costar(color, light);`,
    },
  ]
};

// FEEDBACK DANGER
export const SystemFeedbackDanger = Template.bind({});
SystemFeedbackDanger.args = {
  palette: [
    // BASE
    {
      color: 'danger',
      wcagColor: 'light',
      wcagContrast: 'AA 5.1:1',
      wcagDescription: 'light',
      name: 'Base',
      description: '#DE0000',
      examples: `
        @include costar(background-color, danger);
        @include costar(color, light);`,
    },
    // LIGHT
    {
      color: 'danger-light',
      wcagColor: 'dark',
      wcagContrast: 'AA 5.3:1',
      wcagDescription: 'dark',
      name: 'Light',
      description: '#ff1212',
      examples: `
        @include costar(background-color, danger-light);
        @include costar(color, dark);`,
    },
    {
      color: 'danger-lighter',
      wcagColor: 'light',
      wcagContrast: 'AA 6.2:1',
      wcagDescription: 'light',
      name: 'Lighter',
      description: '#ff4545',
      examples: `
        @include costar(background-color, danger-lighter);
        @include costar(color, light);`,
    },
    {
      color: 'danger-lightest',
      wcagColor: 'danger-darkest',
      wcagContrast: 'AAA 9.3:1',
      wcagDescription: 'danger-darkest',
      name: 'Lightest',
      description: '#ffabab',
      examples: `
        @include costar(background-color, danger-lightest);
        @include costar(color, danger-darkest);`,
    },
    // DARK
    {
      color: 'danger-dark',
      wcagColor: 'light',
      wcagContrast: 'AAA 7.7:1',
      wcagDescription: 'light',
      name: 'Dark',
      description: '#ab0000',
      examples: `
        @include costar(background-color, danger-dark);
        @include costar(color, light);`,
    },
    {
      color: 'danger-darker',
      wcagColor: 'light',
      wcagContrast: 'AAA 11.7:1',
      wcagDescription: 'light',
      name: 'Darker',
      description: '#780000',
      examples: `
        @include costar(background-color, danger-darker);
        @include costar(color, light);`,
    },
    {
      color: 'danger-darkest',
      wcagColor: 'light',
      wcagContrast: 'AAA 16.8:1',
      wcagDescription: 'light',
      name: 'Darkest',
      description: '#450000',
      examples: `
        @include costar(background-color, danger-darkest);
        @include costar(color, light);`,
    },
  ]
};