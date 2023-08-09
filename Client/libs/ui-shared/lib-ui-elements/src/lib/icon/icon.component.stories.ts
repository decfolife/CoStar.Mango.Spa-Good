import { Meta, Story } from '@storybook/angular';
import {
  flipOptions,
  animationOptions,
  rotateOptions,
  colorOptions,
  cremIcons,
  regularIcons,
  solidIcons,
  sizeOptions,
  pullOptions,
} from './definitions/fontAwesome';
import { IconComponent } from './icon.component';

export default {
  title: 'Components/Atoms/Icon',
  component: IconComponent,
  argTypes: {
    pack: {
      control: {
        type: 'select',
        options: [ 'crem', 'solid', 'regular' ],
      },
    },
    icon: {
      control: {
        type: 'select',
        options: [ ...cremIcons, ...regularIcons, ...solidIcons],
      },
    },
    color: { control: 'radio', options: colorOptions },
    rotate: { control:  'select', options: rotateOptions },
    flip: { control: 'select', options: flipOptions },
    animation: { control: 'select', options: animationOptions },
    size: { control: 'select', options: sizeOptions },
    pull: { control: 'select', options: pullOptions },
  },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} as Meta<IconComponent>;

const Template: Story<IconComponent> = (args: IconComponent) => ({
  props: args,
});

export const Default = Template.bind({});
// FontAwesome
Default.args = {
  icon: 'faStar',
  pack: undefined,
  color: undefined,
  size: undefined,
  rotate: undefined,
  flip: undefined,
  animation: undefined,
  pull: undefined,
};

export const customCremIcon = Template.bind({});
customCremIcon.args = {
  icon: 'cremEllipsis',
  pack: 'crem',
  color: undefined,
  size: undefined,
  rotate: undefined,
  flip: undefined,
  animation: undefined,
  pull: undefined,
};