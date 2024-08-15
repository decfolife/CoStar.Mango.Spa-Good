import { CommonModule } from '@angular/common';
import { DxNumberBoxModule } from 'devextreme-angular/ui/number-box';
import { LibDataModelsModule } from '@mango/data-models/lib-data-models';
import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { NumberBoxComponent } from './number-box.component';

export default {
  title: 'Components/ Number Box',
  component: NumberBoxComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        LibDataModelsModule,
        DxNumberBoxModule,
      ],
    }),
  ],
  argTypes: {

    disabled: {
      description: 'Identifies if the number box is active or not',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: false,
        } 
      }
    },

    isRequired: {
      description: 'identifies if the input is required',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: false,
        } 
      }
    },

  }
} as Meta<NumberBoxComponent>;

const Template: Story<NumberBoxComponent> = (args: NumberBoxComponent) => ({
  props: args
});

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  isRequired: false,
};
