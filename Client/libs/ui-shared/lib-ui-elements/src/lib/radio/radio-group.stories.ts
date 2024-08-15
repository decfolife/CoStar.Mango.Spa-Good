import { CommonModule } from "@angular/common";
import { moduleMetadata, Meta, StoryObj, argsToTemplate } from "@storybook/angular";
import { CremRadioGroupComponent } from "./radio-group.component";
import { CremRadioComponent } from "./radio.component";


const meta: Meta<any> = {
  component: CremRadioGroupComponent,
  title: 'Components/Radio *',
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        CremRadioComponent
      ],
    }),
  ],
  argTypes: {
    '[ngModel]': {
      description: 'Current selected radio value, two way binding',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: false
        }
      }
    },
    name: {
      description: 'The unique name of the radio group, must be provided',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: 'NULL'
        }
      }
    },
    disabled: {
      description: 'Whether the radio group is disabled or no',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: false
        }
      }
    },
    '(ngModelChange)': {
      description: 'The callback function when current selected radio value changes',
      table: {
        category: 'Outputs',
      }
    },
  }
}

export default meta;

type Story = StoryObj<CremRadioGroupComponent>;

export const Default: Story = {
  args: {
    name: 'radio-group-1',
    disabled: false
  },
  render: (args: CremRadioGroupComponent) => ({
    props: args,
    template: `
    <crem-radio-group ${argsToTemplate(args)}>
      <crem-radio-field value='atlanta'>Atlanta</crem-radio-field>
      <crem-radio-field value='new york'>New York</crem-radio-field>
      <crem-radio-field value='austin'>Austin</crem-radio-field>
      <crem-radio-field value='chicago'>Chicago</crem-radio-field>
    </crem-radio-group>`
  })
}

export const Disabled: Story = {
  args: {
    name: 'radio-group-2',
    disabled: true
  },
  render: (args: CremRadioGroupComponent) => ({
    props: args,
    template: `
    <crem-radio-group ${argsToTemplate(args)} >
      <crem-radio-field value='atlanta'>Atlanta</crem-radio-field>
      <crem-radio-field value='new york'>New York</crem-radio-field>
      <crem-radio-field value='austin'>Austin</crem-radio-field>
      <crem-radio-field value='chicago'>Chicago</crem-radio-field>
    </crem-radio-group>`
  })
}

export const Vertical: Story = {
  args: {
    name: 'radio-group-3',
    disabled: false
  },
  render: (args: CremRadioGroupComponent) => ({
    props: args,
    template: `
    <crem-radio-group ${argsToTemplate(args)}>
      <div style="display: flex; flex-direction: column">
        <crem-radio-field value='atlanta'>Atlanta</crem-radio-field>
        <crem-radio-field style="margin-top: 5px" value='new york'>New York</crem-radio-field>
        <crem-radio-field style="margin-top: 5px"  value='austin'>Austin</crem-radio-field>
        <crem-radio-field style="margin-top: 5px"  value='chicago'>Chicago</crem-radio-field>
      </div>
    </crem-radio-group>`
  })
}