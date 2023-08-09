import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { solidIcons, regularIcons } from '../icon/definitions/fontAwesome';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon';

interface ButtonComponentStory extends ButtonComponent {
  text: string
}

export default {
  title: 'Components/Molecules/Button',
  component: ButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        IconModule
      ],
    }),
  ],
  argTypes: {
    style: { control: 'radio', options: [ 'flat', 'basic', 'stroked' ] },
    color: { control: 'radio', options: ['primary', 'secondary', 'warning', 'danger'] },
    size: { control: 'radio', options: ['small', 'medium', 'big'] },
    iconPosition: { control: 'radio', options: ['left', 'right'] },
    icon: { control: 'select', options: [...solidIcons, ...regularIcons], },
    iconConf: {
      color: { control: 'text' },
      pack: { control: 'text' },
      rotate: { control: 'text' },
      flip: { control: 'text' },
      animation: { control: 'text' },
      size: { control: 'text' },
      pull: { control: 'text' },
      fill: { control: 'text' },
      transform: { control: 'text' },
    }
  },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} as Meta<ButtonComponent>;

const Template: Story<ButtonComponentStory> = (args: ButtonComponentStory) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  text: 'Button',
  style: 'flat',
  color: 'primary',
  size: 'medium',
  ariaLabel: '',
  disabled: false,
  className: '',
  styles: '',
  // Icon Configuration
  icon: undefined,
  iconPosition: undefined,
  iconConf: {
    color: '',
    pack: '',
    rotate: '',
    flip: '',
    animation: '',
    size: '',
    pull: '',
    fill: '',
    transform: '',
  },
};


export const LoadingStatus = Template.bind({});
LoadingStatus.args = {
  text: 'Button',
  style: 'flat',
  color: 'primary',
  size: 'medium',
  ariaLabel: '',
  disabled: true,
  className: '',
  styles: '',
  // Icon Configuration
  icon:  'faSpinner',
  iconPosition: undefined,
  iconConf: {
    color: '',
    pack: 'solid',
    rotate: '',
    flip: '',
    animation: 'spin',
    size: '',
    pull: '',
    fill: '',
    transform: '',
  },
};
