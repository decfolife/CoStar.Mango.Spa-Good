import { moduleMetadata, Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from './card.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CardHeaderDirective } from './cardHeader.directive';
import { DropdownModule } from '../dropdown';
import { IconModule } from '../icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from '../button';

const meta: Meta<CardComponent> =  {
  component: CardComponent,
  title: 'Components/Card *',
  decorators: [
    moduleMetadata({
      declarations: [CardHeaderDirective],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        MatCardModule,
        MatMenuModule,
        MatDialogModule,
        MatIconModule,
        SearchModule,
        DropdownModule,
        IconModule,
        ButtonModule
      ],
    }),
  ],
  argTypes: {
    title: {
      description: 'Input to change the card title.',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: 'Card Title'
        }
      }
    },
    id: {
      description: 'Unique ID of the card.',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: 'EMPTY_STRING'
        }
      }
    },
    subtitle: {
      description: 'A subtitle displayed next to the card title.',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: '(Subtitle)'
        }
      }
    },
    customDropdownMenu: {
      description: 'A custom dropdown menu.',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: 'Card customDropdownMenu'
        }
      }
    },
    filterInitialValue: {
      description: 'Filter initial value.',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: null
        }
      }
    },
    showCustomHeader: {
      description: 'Customer Card header that when used cqan display icons and different button types.',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: true
        }
      }
    },
    showFilterClearButton: {
      description: 'Shows clear filter button.',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: false
        }
      }
    },
    filterData: {
      description: 'The filter data.',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: null
        }
      }
    },
    moreOptions: {
      description: 'More options',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: null
        }
      }
    },
    pendoTitleId: {
      description: 'ID for pendo title.',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: 'EMPTY_STRING'
        }
      }
    },
    counter: {
      description: 'A counter.',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: null
        }
      }
    },
    exportId: {
      description: 'The Export ID.',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: 'EMPTY_STRING'
        }
      }
    },
    dropDisplay: {
      description: 'Display dropdown.',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: 'test'
        }
      }
    },
    dropValue: {
      description: 'Dropdown value.',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: 'test'
        }
      }
    },
    dropdownPlaceholder: {
      description: 'the dropdown placeholder.',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: 'test'
        }
      }
    },
    contentPadding: {
      description: 'contentPadding.',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: true
        }
      }
    },
    backgroundTransparent: {
      description: 'Property that when toggles sets the card background to be transparent.',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: false
        }
      }
    },
    noBorder: {
      description: 'Property that toggles the visibility of the border around the card.',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: false
        }
      }
    },
  },
};export default meta;

type Story = StoryObj<CardComponent>

export const Default: Story = {
  
  args: {
    title: 'Card Title',
    id: 'Id',
    subtitle: '(Subtitle)',
    customDropdownMenu: false,
    filterInitialValue: { displayKey: "Filter 1", valueKey: "v1" },
    showCustomHeader: true,
    showFilterClearButton: false,
    filterData: null,
    moreOptions: {export: true},
    pendoTitleId: '',
    counter: 22,
    exportId: '',
    dropDisplay: 'test',
    dropValue: 'test',
    dropdownPlaceholder: 'test',
    contentPadding: true,
    backgroundTransparent: false,
    noBorder: false
  },
  render: (args: CardComponent) => ({
    props: args,
    template: `
      <crem-card
        [title]="title"
        [id]="id"
        [subtitle]="subtitle"
        [customDropdownMenu]="customDropdownMenu"
        [filterInitialValue]="filterInitialValue"
        [showCustomHeader]="showCustomHeader"
        [showFilterClearButton]="showFilterClearButton"
        [filterData]="filterData"
        [moreOptions]="moreOptions"
        [pendoTitleId]="pendoTitleId"
        [counter]="counter"
        [exportId]="exportId"
        [dropDisplay]="dropDisplay"
        [dropValue]="dropValue"
        [dropdownPlaceholder]="dropdownPlaceholder"
        [contentPadding]="contentPadding"
        [backgroundTransparent]="backgroundTransparent"
        [noBorder]="noBorder"
      >
        <div class="customHeader" customHeader>
          <crem-button text="Button" btnStyle="basic" color="secondary"></crem-button> &nbsp;
          <crem-button type="primary" text="Button" icon="faSave" iconPosition="right"></crem-button> &nbsp;
          <crem-button type="secondary">Button</crem-button>
        </div>
        <div class="cardContent" cardContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </crem-card>
    `
  })
}
