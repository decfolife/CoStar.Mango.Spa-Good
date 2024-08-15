import { CommonModule } from '@angular/common';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { NoObjectsFoundComponent } from './no-objects-found.component';

const meta: Meta<NoObjectsFoundComponent> = {
  component: NoObjectsFoundComponent,
  title: 'Components/No Objects Found *',
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
      ],
    }),
  ],
  argTypes: {
    title: {
      description: 'The main title displayed when no objects are found.',
      table: {
        category: 'Input',
        defaultValue: { summary: 'No objects found' },
      },
    },
    subtitle: {
      description: 'The subtitle providing guidance on what to do next.',
      table: {
        category: 'Input',
        defaultValue: { summary: 'Create or add a new object to get started.' },
      },
    },
  },
};

export default meta;

type Story = StoryObj<NoObjectsFoundComponent>;

export const Default: Story = {
  args: {
    title: 'No objects found',
    subtitle: 'Create or add a new object to get started',
  },
  render: (args: NoObjectsFoundComponent) => ({
    props: args,
  })
}