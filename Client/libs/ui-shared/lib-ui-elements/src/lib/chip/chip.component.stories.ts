import { CommonModule } from '@angular/common';
import { Meta, Story, moduleMetadata } from '@storybook/angular';
import {
  DxButtonModule,
  DxPopoverModule,
  DxTemplateModule,
} from 'devextreme-angular';
import { ChipComponent } from './chip.component';

interface ChipComponentStory extends ChipComponent {
  text: string;
}

export default {
  title: 'Components/Chip',
  component: ChipComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        DxButtonModule,
        DxPopoverModule,
        DxTemplateModule,
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
} as Meta<ChipComponent>;

const Template: Story<ChipComponentStory> = (args: ChipComponentStory) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {
  id: 'chip',
  width: null,
  chipContent: 'Chip Content',
  popoverContent: 'Popover content',
  matTooltipContent: 'Tooltip Content',
  chipStatus: 'completeStatus',
};
