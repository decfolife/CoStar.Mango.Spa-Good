import { CommonModule } from '@angular/common';
import { LibDataModelsModule } from '@mango/data-models/lib-data-models';
import { argsToTemplate, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { CheckBoxComponent } from './check-box.component';

export default {
  title: 'Components/Checkbox',
  component: CheckBoxComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        LibDataModelsModule,
        CheckBoxComponent,
        DxValidatorModule
      ],
    }),
  ],
 argTypes: {
  checkBox: {
    table: {
      disable: true
    }
  },
  onChange: {
    table: {
      disable: true
    }
  },
  onTouched: {
    table: {
      disable: true
    }
  },
 }
} as Meta<CheckBoxComponent>;


type Story = StoryObj<CheckBoxComponent>;

export const Default: Story = {
  args: {
    value: true,
    disabled: false
  },
  render: (args: CheckBoxComponent) => ({
    props: args,
    template: `
    <crem-check-box ${argsToTemplate(args)}>Checkbox</crem-check-box>
    `
  })
}

export const Disabled: Story = {
  args: {
    value: true,
    disabled: true
  },
  render: (args: CheckBoxComponent) => ({
    props: args,
    template: `
    <crem-check-box ${argsToTemplate(args)}>Disabled</crem-check-box>
    `
  })
}

export const Group: Story = {
  args: {
  },
  render: (args: CheckBoxComponent) => ({
    props: args,
    template: `
    <div style="display: flex; justify-content: space-around; width: 400px;">
    <crem-check-box [value]="true">Checkbox 1</crem-check-box>
    <crem-check-box [value]="false">Checkbox 2</crem-check-box>
    <crem-check-box [value]="false">Checkbox 3</crem-check-box>
    </div>
    `
  })
}