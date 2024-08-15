import { CommonModule } from '@angular/common';
import { Meta, argsToTemplate, moduleMetadata, StoryObj } from '@storybook/angular';
import { ToggleSliderComponent } from './toggle-slider.component';

export default {
  title: 'Components/Toggle Slider',
  component: ToggleSliderComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
      ],
    }),
  ],
  argTypes: {
    disabled: {
      description: 'Wether the toggle slide is disabled',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: false,
        } 
      }
    },
    id: {
      description: 'The id of the input inside the toggle slide',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: '',
        } 
      }
    },
    value: {
      description: 'The value of the checked state of the toggle',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: false,
        } 
      }
    },
    size: {
      description: 'The size of the toggle',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: 'regular',
        } 
      }
    },
    checkedLabel: {
      description: 'The label inside the toggle when checked',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: '',
        } 
      }
    },
    uncheckedLabel: {
      description: 'The label inside the toggle when unchecked',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: '',
        } 
      }
    },
    ariaLabel: {
      description: 'The aria label of the toggle',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: '',
        } 
      }
    },
    '[ngModel]': {
      description: 'Current selected toggle value, two way binding',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: false
        }
      }
    },
    selectionChange: {
      description: 'Emits an object with the current `checked` value of the toggle',
      table: {
        category: 'Outputs',
        defaultValue: {
          summary: '',
        } 
      }
    }
  }
} as Meta<ToggleSliderComponent>;


type Story = StoryObj<ToggleSliderComponent>;


export const Default: Story = {
  args: {
    id: 'switch-1',
    value: true,
    disabled: false,
    size: 'regular',
  },
  render: (args: ToggleSliderComponent) => ({
    props: args,
    template: `
    <div>
    <crem-toggle-slider ${argsToTemplate(args)}>
    </crem-toggle-slider>
    </div>
    `
  })
}


export const WithLabels: Story = {
  args: {
  },
  render: (args: ToggleSliderComponent) => ({
    props: args,
    template: `
    <div style="display: flex; justify-content:">
        <crem-toggle-slider style="margin-right: 10px"  checkedLabel='1' uncheckedLabel='0' value="true">
        </crem-toggle-slider>
        <crem-toggle-slider size='wide' style="margin-right: 10px" checkedLabel='ON' uncheckedLabel='OFF'>
        </crem-toggle-slider>
        <crem-toggle-slider size='extra-wide' checkedLabel='IS' uncheckedLabel='IS NOT' value="true">
        </crem-toggle-slider>
    </div>
    `
  })
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}


