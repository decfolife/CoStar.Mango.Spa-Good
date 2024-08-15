import { CommonModule } from '@angular/common';
import { LibDataModelsModule } from '@mango/data-models/lib-data-models';
import { Meta, StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { ButtonModule } from '../button';
import { CremPopoverComponent } from './popover.component';


export default {
  title: 'Components/Popover',
  component: CremPopoverComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        LibDataModelsModule,
        DxValidatorModule,
        ButtonModule
      ],
    }),
  ],
  argTypes: {

    targetId: {
      description: 'ID of the element that will be clicked to open the popover',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: "button-1"
        } 
      }
    },

    toolTipData: {
      description: 'Popover body content',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        } 
      }
    },
    popoverId: {
      description: 'Unique ID of the popover window',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: "Crem-PopoverId",
        } 
      }
    },
    arrowPosition: {
      description: 'Position of the popover window arrow',
      table: {
        category: 'Options',
        defaultValue: {
          summary: "bottom",
        } 
      }
    },
    hideOnOutsideClick: {
      description: 'Close the popover when clicking outside of the popover element',
      table: {
        category: 'Options',
        defaultValue: {
          summary: "false",
        } 
      }
    },
    popupAriaLabel: {
      description: 'Aria label of the popover',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: "Aria label popup",
        } 
      }
    },
    getTitle: {
      description: 'Title text on the popover header',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: "Pop Up Title",
        } 
      }
    },
    showCloseButton: {
      description: 'Show close button (x)',
      table: {
        category: 'Options',
        defaultValue: {
          summary: "true",
        } 
      }
    },
    isDragEnabled: {
      description: 'Ability to drag the popover window',
      table: {
        category: 'Options',
        defaultValue: {
          summary: "false",
        } 
      }
    },
    onMouseEvent: {
      description: 'Option to open the popover on mouse enter or hover',
      table: {
        category: 'Options',
        defaultValue: {
          summary: "click",
        } 
      }
    },
    hideEvent: {
      description: 'Option to close the popover',
      table: {
        category: 'Options',
        defaultValue: {
          summary: " ",
        } 
      }
    },
    closePopover: {
      name: 'closePopover()',
      type: 'function',
      description: 'Dispatch an event when escape key is clicked.',
      table: {
        category: 'Methods',
      }
    },
  },
  
} as Meta<CremPopoverComponent>;


type Story = StoryObj<CremPopoverComponent>;

export const Default: Story = {
  args: {
    targetId: 'button-1',
    toolTipData: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    popoverId: 'Crem-PopoverId',
    arrowPosition: 'bottom',
    hideOnOutsideClick: true,
    popupAriaLabel: 'Aria label popup',
    getTitle: 'Pop Up Title',
    showCloseButton: true,
    isDragEnabled: false,
    onMouseEvent: 'click',
    hideEvent: ' ',
    width: '300',
    height: '200',
  },

  render: (args: CremPopoverComponent) => ({
    props: args,
    template: `
    <div class="dx-field-value-static" style="display: flex;">
    <crem-button
    id='button-1'
    [text]="'Button'"
    [btnStyle]="'flat'"
    [color]="'primary'"
    [size]="'medium'"
    [ariaLabel]="''"
    [disabled]="false"
    [className]="''"
    [styles]="''"></crem-button>
      <crem-popover ${argsToTemplate(args)} ><crem-popover>
      `
  })
}
