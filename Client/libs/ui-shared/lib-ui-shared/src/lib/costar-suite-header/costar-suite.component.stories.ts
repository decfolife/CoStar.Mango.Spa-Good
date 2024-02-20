import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CostarSuiteHeaderComponent } from './costar-suite-header.component';

export default {
  title: 'Organisms/Costar Header',
  component: CostarSuiteHeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<CostarSuiteHeaderComponent>;

const Template: Story<CostarSuiteHeaderComponent> = (args: CostarSuiteHeaderComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
