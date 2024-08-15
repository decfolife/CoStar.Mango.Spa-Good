import { CommonModule } from '@angular/common';
import {
  Meta,
  StoryObj,
  argsToTemplate,
  moduleMetadata,
} from '@storybook/angular';
import { DxButtonModule, DxPopupModule } from 'devextreme-angular';
import { ButtonModule } from '../button';
import { InputComponent, InputLabelComponent } from '../input';
import { CremPopupComponent } from './popup.component';
import { useArgs } from '@storybook/preview-api';

const meta: Meta<CremPopupComponent> = {
  component: CremPopupComponent,
  title: 'Components/Modal *',
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        DxPopupModule,
        ButtonModule,
        InputLabelComponent,
        DxButtonModule,
        InputComponent,
      ],
    }),
  ],
  argTypes: {
    id: {
      description: 'The id of the popup',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: 'NULL',
        },
      },
    },
    saveButtonId: {
      description: 'The id of the save button',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: 'NULL',
        },
      },
    },
    closeButtonId: {
      description: 'The id of the close button',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: 'NULL',
        },
      },
    },
    applyButtonId: {
      description: 'The id of the apply button',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: 'NULL',
        },
      },
    },
    title: {
      description: 'Title of the popup',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: 'NULL',
        },
      },
    },
    draggable: {
      description: 'Specify whether the popup is draggable or no',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: true,
        },
      },
    },
    saveButtonText: {
      description:
        'The text inside the save button, if null the button is removed',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: 'Save',
        },
      },
    },
    applyButtonText: {
      description:
        'The text inside the apply button, if null the button is removed',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: 'Apply',
        },
      },
    },
    closeButtonText: {
      description:
        'The text inside the close button, if null the button is removed',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: 'Cancel',
        },
      },
    },
    visible: {
      description: 'Specify whether the popup is visible or no',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: false,
        },
      },
    },
    resizable: {
      description: 'Specify whether the popup is resizable or no',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: false,
        },
      },
    },
    showInfo: {
      description: 'Show the info icon next to the title',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: true,
        },
      },
    },
    height: {
      description: 'The height of the popup in any unit, px, rem...',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: 'NULL',
        },
      },
    },
    width: {
      description: 'The width of the popup in any unit, px, rem...',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: 'NULL',
        },
      },
    },
    showCloseButton: {
      description: 'Whether to show the close button or no',
      control: 'boolean',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: true,
        },
      },
    },
    hideOnOutsideClick: {
      description:
        'Specifies whether to hide the popup component if a user clicks outside it',
      control: 'boolean',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: false,
        },
      },
    },
    close: {
      description: 'Emitted when the close button is clicked',
      table: {
        category: 'Events',
      },
    },
    save: {
      description: 'Emitted when the save button is clicked',
      table: {
        category: 'Events',
      },
    },
    apply: {
      description: 'Emitted when the apply button is clicked',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;

type Story = StoryObj<CremPopupComponent>;

export const Default: Story = {
  args: {
    id: 'crem-popup',
    saveButtonId: 'save-button',
    applyButtonId: 'apply-button',
    closeButtonId: 'close-button',
    visible: false,
    title: 'New Popup',
    showInfo: true,
    saveButtonText: 'Save',
    closeButtonText: 'Cancel',
    applyButtonText: 'Apply',
    height: '500px',
    width: '800px',
    draggable: true,
    resizable: true,
    showCloseButton: true,
    hideOnOutsideClick: false,
  },
  render: (args: CremPopupComponent, ctx: any) => {
    const [_, updateArgs] = useArgs();
    (args as any).onShowClick = () => updateArgs({ ...args, visible: true });
    return {
      props: args,
      template: `
        <crem-button text='Show popup' btnStyle='flat' color='primary' (buttonClick)='onShowClick()'></crem-button>
        <crem-popup ${argsToTemplate(args)}>
        This is the body of the popup
        <div body class="grid-container" style="padding-top: 10px; display: grid; grid-template-columns: auto auto">
          <div class="grid-item" style="padding: 5px" *ngFor="let item of [].constructor(10); let i = index"> 
            <crem-input
            [state]="'active'"
            [showHint]="true"
            [showLabel]="true"
            [showInfo]="true"
            [label]="'Label'"
            [labelPosition]="'top'"
            [inputType]="'text'"
            [value]="''"
            [name]="''"
            [placeholder]="'Placeholder'"
            [required]="false"
            [hintText]="'Hint text description'"
            ></crem-input>
          </div>
        </div>
        </crem-popup>
      `,
    };
  },
};
