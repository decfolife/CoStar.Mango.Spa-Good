import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ScreenLoaderComponent } from './screen-loader.component';

export default {
  title: 'Components/Atoms/Spinner',
  component: ScreenLoaderComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<ScreenLoaderComponent>;

const Template: Story<ScreenLoaderComponent> = (args: ScreenLoaderComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
