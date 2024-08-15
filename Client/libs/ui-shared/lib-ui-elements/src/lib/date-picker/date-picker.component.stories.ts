import { CommonModule } from '@angular/common';
import { LibDataModelsModule } from '@mango/data-models/lib-data-models';
import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { DxDateBoxModule, DxValidationSummaryModule, DxValidatorModule } from 'devextreme-angular';
import { DatePickerComponent } from './date-picker.component';

interface DatepickerComponentStory extends DatePickerComponent {
  text: string
}

export default {
  title: 'Components/DatePicker *',
  component: DatePickerComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        LibDataModelsModule,
        DxDateBoxModule,
        DxValidatorModule,
        DxValidationSummaryModule
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
} as Meta<DatePickerComponent>;

const Template: Story<DatepickerComponentStory> = (args: DatepickerComponentStory) => ({
  props: args
});

export const Default = Template.bind({});
Default.args = {
  value: null,
  dateFormat: "MM/dd/yyyy",
  invalidDateMessage: "Invalid date",
  useMaskBehavior: false,
  showClearButton: true,
  isRequired: true,
  inputId: "date-picker",
  min: null,
  max: null,
  disabled: false,
  showDefaultValidationTooltip: true,
};
