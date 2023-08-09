import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ModalComponent } from './modal.component';
import { ModalModule } from './modal.module'

interface ModalComponentStory extends ModalComponent {
  modalContent: string,
}

export default {
  title: 'Components/Organisms/Modal',
  component: ModalComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [ ModalModule ],
    }),
  ],
} as Meta<ModalComponent>;

// TODO: Fix logic error for primaryFooterButtonEnabledDisabled, customFooter: hides anyway when explicitly false
// primaryFooterButtonEnabledDisabled="${args?.['primaryFooterButtonEnabledDisabled']}"
// customFooter="${args?.['customFooter']}"
const Template: Story<ModalComponentStory> = ( args: ModalComponentStory ) => ({
  props: args,
  template: `
    <crem-modal
      modalId="${args?.['modalId']}"
      modalTitleId="${args?.['modalTitleId']}"
      closeIconVisible="${args?.['closeIconVisible']}"
      modalTitle="${args?.['modalTitle']}"
      primaryFooterButtonText="${args?.['primaryFooterButtonText']}"
      closeOrCancelButtonText="${args?.['closeOrCancelButtonText']}"
    >
      <div modalContent>${args?.['modalContent']}</div>
    </crem-modal>
  `,
});

export const Default = Template.bind({});
Default.args = {
  modalId: '',
  modalTitleId: '',
  closeIconVisible: false,
  modalTitle: 'Confirm Deletion',
  modalContent: "Are you sure you want to delete &nbsp; <div class='user-name'>Super Admin</div>?",
  primaryFooterButtonText: 'Confirm',
  closeOrCancelButtonText: 'Cancel',
  // primaryFooterButtonEnabledDisabled: false,
  // customFooter: false,
};
