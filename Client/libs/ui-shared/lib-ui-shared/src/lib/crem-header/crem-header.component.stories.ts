import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CremHeaderComponent } from './crem-header.component';

export default {
  title: 'Components/Organisms/Header',
  component: CremHeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<CremHeaderComponent>;

const Template: Story<CremHeaderComponent> = (args: CremHeaderComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
