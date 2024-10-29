import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { InputComponent } from '../input';
import { CremFormsDemoComponent } from './forms.demo.component';
import { CremFormsModule } from './forms.module';

const meta: Meta<CremFormsDemoComponent> = {
  component: CremFormsDemoComponent,
  title: 'Components/Forms',
  decorators: [
    moduleMetadata({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        CremFormsModule,
        InputComponent,
      ],
    }),
  ],
};

export default meta;

type Story = StoryObj<CremFormsDemoComponent>;

export const Forms: Story = {
  args: {
    formExample: 'registration',
  },
};

export const Layout: Story = {
  args: {
    formExample: 'layout',
  },
};

export const LabelAlignment: Story = {
  args: {
    formExample: 'labelAlignment',
  },
};

export const errors: Story = {
  args: {
    formExample: 'errors',
  },
};
