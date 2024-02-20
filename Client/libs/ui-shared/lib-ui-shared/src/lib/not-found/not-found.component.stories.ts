import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { NotFoundComponent } from './not-found.component';

export default {
  title: 'Organisms/Not Found',
  component: NotFoundComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, MatIconModule],
    }),
  ],
} as Meta<NotFoundComponent>;

const Template: Story<NotFoundComponent> = (args: NotFoundComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
};
