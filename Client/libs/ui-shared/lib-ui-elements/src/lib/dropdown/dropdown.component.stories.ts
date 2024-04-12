import { CommonModule } from '@angular/common';
import { LibDataModelsModule } from '@mango/data-models/lib-data-models';
import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { DxButtonModule, DxDataGridModule, DxDateBoxModule, DxDropDownBoxModule, DxFormModule, DxSelectBoxModule, DxTemplateModule, DxTextBoxModule, DxValidationSummaryModule, DxValidatorModule } from 'devextreme-angular';
import { DropdownComponent } from './dropdown.component';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonModule } from '../button';

interface DropdownComponentStory extends DropdownComponent {
  text: string
}

export default {
  title: 'Components/Dropdown',
  component: DropdownComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        LibDataModelsModule,
        DxDropDownBoxModule,
        DxTextBoxModule,
        DxButtonModule,
        DxDataGridModule,
        DxTemplateModule,
        DxValidatorModule,
        DxFormModule,
        DxSelectBoxModule,
        DxValidationSummaryModule,
        MatMenuModule,
        ButtonModule,
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
} as Meta<DropdownComponent>;

const Template: Story<DropdownComponent> = (args: DropdownComponentStory) => ({
  props: args
});

export const Default = Template.bind({});
Default.args = {
  initialSelectedValue: null,
  placeholder: 'Select an item...',
  label: 'Label',
  isSearchable: true,
  selectMode: 'multiple',
  required: true,
  readOnly: false,
  allowSearch: true,
  dataSource: [
    {
      displayKey: "Apples",
      valueKey: "Apples"
    },
    {
      displayKey: "Oranges",
      valueKey: "Oranges"
    },
    {
      displayKey: "Lemons",
      valueKey: "Lemons"
    },
    {
      displayKey: "Pears",
      valueKey: "Pears"
    },
    {
      displayKey: "Pineapples",
      valueKey: "Pineapples"
    },
  ]
};
