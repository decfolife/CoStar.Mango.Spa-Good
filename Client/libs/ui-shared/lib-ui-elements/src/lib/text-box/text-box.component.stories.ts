import { CommonModule } from '@angular/common';
import { LibDataModelsModule } from '@mango/data-models/lib-data-models';
import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { TextBoxComponent } from './text-box.component';

interface TexboxComponentStory extends TextBoxComponent {
  text: string
}

export default {
  title: 'Components/Textbox',
  component: TextBoxComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        LibDataModelsModule,
        DxTextBoxModule,
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
} as Meta<TextBoxComponent>;

const Template: Story<TexboxComponentStory> = (args: TexboxComponentStory) => ({
  props: args
});

export const Default = Template.bind({});
Default.args = {
  value: 'Texbox example',
  invalidDateMessage: 'Invalid date message',
  isRequired: true,
  maxLength: 50,
  maxLengthMessage: 'Too long',
  initialFocus: null,
  inputId: 'input-id',
  customRequireValidation: null,
  showRedBorder: false,
  disabled: false
};
