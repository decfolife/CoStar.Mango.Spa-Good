import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { DescriptionsComponent } from './descriptions.component';

interface DescriptionsComponentStory extends DescriptionsComponent {
  text: string
}
export default {
  title: 'Components/Description',
  component: DescriptionsComponent,
  decorators: [
    moduleMetadata({
      imports: [
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} as Meta<DescriptionsComponent>;

const Template: Story<DescriptionsComponent> = (args: DescriptionsComponentStory) => ({
  props: args
});

export const Default = Template.bind({});
Default.args = {
  items: [
  {
    key: 'Building Name',
    value: 'Property AddressPhipps Plaza Heights'
  },
  {
    key: 'Property Address',
    value: '3438 Main street , Altanta, GA 30020, United States'
  },
  {
    key: 'Costar Property ID',
    value: '3438'
  },
  {
    key: 'Status',
    value: 'Active'
  }]
};
