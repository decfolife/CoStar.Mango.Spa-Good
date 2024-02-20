import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ModalComponent } from './modal.component';
import { ModalModule } from './modal.module'
import { ButtonModule } from '../button';
import { IconModule } from '../icon';
import { DragDropModule } from '@angular/cdk/drag-drop';

export default {
  title: 'Components/Modal',
  component: ModalComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        ModalModule,
        DragDropModule,
        ButtonModule,
        IconModule,
      ],
    }),
  ]
} as Meta<ModalComponent>;

const Template: Story<ModalComponent> = (args: ModalComponent) => ({
  props: args,
  template: `
  <crem-modal 
  [modalTitle]="modalTitle"
  [modalTitleId]="modalTitleId"
  [closeIconVisible]="closeIconVisible"
  [primaryFooterButtonText]="primaryFooterButtonText"
  [primaryFooterButtonEnabledDisabled]="primaryFooterButtonEnabledDisabled"
  [closeOrCancelButtonText]="closeOrCancelButtonText"
  [modalId]="modalId"
  [customFooter]="customFooter"
  [closeDialogResult]="closeDialogResult"
  [className]="className"
  >
  <div modalContent>Modal content</div>
  </crem-modal>
  `
});

export const Default = Template.bind({});
Default.args = {
  modalTitle: 'Modal Title',
  modalTitleId: 'modal-title-id',
  closeIconVisible: true,
  primaryFooterButtonText: 'Apply',
  primaryFooterButtonEnabledDisabled: true,
  closeOrCancelButtonText: 'Cancel',
  modalId: 'modal-id',
  customFooter: false,
  closeDialogResult: 'Result',
  className: 'newModal',
};
