import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CheckBoxComponent } from './check-box.component';
import { solidIcons, regularIcons, cremIcons } from '../icon/definitions/fontAwesome';
import { CommonModule } from '@angular/common';
import { LibDataModelsModule } from '@mango/data-models/lib-data-models';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { DxCheckBoxModule } from 'devextreme-angular/ui/check-box';

interface CheckboxComponentStory extends CheckBoxComponent {
  text: string
}

export default {
  title: 'Components/Checkbox',
  component: CheckBoxComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        LibDataModelsModule,
        DxCheckBoxModule,
        DxValidatorModule
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
} as Meta<CheckBoxComponent>;

const Template: Story<CheckboxComponentStory> = (args: CheckboxComponentStory) => ({
  props: args
});

export const Default = Template.bind({});
Default.args = {
  value: true,
  disabled: false
};
