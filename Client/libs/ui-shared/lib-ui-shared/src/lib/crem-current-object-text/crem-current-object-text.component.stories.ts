import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CremCurrentObjectTextComponent } from './crem-current-object-text.component';

export default {
  title: 'Organisms/Current Object Text',
  component: CremCurrentObjectTextComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<CremCurrentObjectTextComponent>;

const Template: Story<CremCurrentObjectTextComponent> = (args: CremCurrentObjectTextComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {};
