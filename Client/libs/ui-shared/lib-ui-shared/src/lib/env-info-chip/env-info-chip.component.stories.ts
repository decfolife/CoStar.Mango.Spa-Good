import { CommonModule } from '@angular/common';
import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { DxButtonModule, DxPopoverModule, DxTemplateModule } from 'devextreme-angular';
import { EnvInfoChipComponent } from './env-info-chip.component';


export default {
  title: 'Organisms/Environment Chip',
  component: EnvInfoChipComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, DxButtonModule,
        DxPopoverModule,
        DxTemplateModule],
    }),
  ],
} as Meta<EnvInfoChipComponent>;

const Template: Story<EnvInfoChipComponent> = (args: EnvInfoChipComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  id: "env-chip",
  chipContent: "Blank | PROD",
  popoverContent: ["Popover content"],
  chipStyle: null,
  withPopup: true,
  actionText: null,
  closable: true,
};
