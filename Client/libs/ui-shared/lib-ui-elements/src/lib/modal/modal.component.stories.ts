import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ModalComponent } from './modal.component';
import { ModalModule } from './modal.module'
import { ButtonModule } from '../button';
import { IconModule } from '../icon';

interface ModalComponentStory extends ModalComponent {
  modalContent: string,
}

export default {
  title: 'Components/Organisms/Modal',
  component: ModalComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        ModalModule,
        ButtonModule,
        IconModule,
      ],
    }),
  ],
  argTypes: {
    closeIconVisible: { control: 'boolean', }
  },
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} as Meta<ModalComponent>;

const Template: Story<ModalComponentStory> = (args: ModalComponentStory) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  modalTitle: 'Modal Title Example',
  modalTitleId: '',
  modalId: '',
  closeIconVisible: true,
};
