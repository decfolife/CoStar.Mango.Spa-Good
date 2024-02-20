import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { LoaderComponent } from './loader.component';

export default {
  title: 'Components/Loader',
  component: LoaderComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<LoaderComponent>;

const Template: Story<LoaderComponent> = (args: LoaderComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
