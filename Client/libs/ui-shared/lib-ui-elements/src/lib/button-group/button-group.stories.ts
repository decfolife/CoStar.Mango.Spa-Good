import { CommonModule } from '@angular/common';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { DxButtonGroupModule } from 'devextreme-angular';
import { ButtonGroupComponent } from './button-group.component';


const meta: Meta<ButtonGroupComponent> = {
  title: 'Components/Button Group',
  component: ButtonGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        DxButtonGroupModule
      ],
    }),
  ],
};
export default meta;
type Story = StoryObj<ButtonGroupComponent>;

export const Simple: Story = {
  args: {
    stylingMode: 'outlined',
    items: [
      {
        text: 'Left',
        value: 'align-left'
      },
      {
        text: 'Center',
        value: 'align-center'
      },
      {
        text: 'Right',
        value: 'align-right'
      },
      {
        text: 'Justify',
        value: 'align-justify'
      },
    ]
  },
};

export const Icons: Story = {
  args: {
    stylingMode: 'outlined',
    items: [
      {
        icon: 'alignleft',
        value: 'align-left'
      },
      {
        icon: 'aligncenter',
        value: 'align-center'
      },
      {
        icon: 'alignright',
        value: 'align-right'
      },
      {
        icon: 'alignjustify',
        value: 'align-justify'
      },
    ]
  },
};

export const Disabled: Story = {
  args: {
    stylingMode: 'outlined',
    items: [
      {
        text: 'Left',
        value: 'align-left'
      },
      {
        text: 'Center',
        value: 'align-center'
      },
      {
        text: 'Right',
        value: 'align-right',
        disabled: true
      },
      {
        text: 'Justify',
        value: 'align-justify',
        disabled: true
      },
    ]
  },
};
