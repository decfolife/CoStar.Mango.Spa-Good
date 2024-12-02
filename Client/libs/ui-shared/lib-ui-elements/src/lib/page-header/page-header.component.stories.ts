import { CommonModule } from '@angular/common';
import {
  Meta,
  StoryObj,
  argsToTemplate,
  moduleMetadata,
} from '@storybook/angular';
import { ButtonModule } from '../button';
import { ButtonGroupComponent } from '../button-group/button-group.component';
import { IconModule } from '../icon';
import { InputLabelComponent } from '../input/label';
import { PageHeaderComponent } from './page-header.component';
import { DropdownModule } from '../dropdown';
import { InputComponent } from '../input/input/input.component';
import { Pill } from '@mango/data-models/lib-data-models';
import { SplitButtonComponent } from '../split-button/split-button.component';

const PORTFOLIO_FILTERS = `
[
  { displayKey: 'Portfolio 1', valueKey: 'Portfolio 1' },
  { displayKey: 'Portfolio 2', valueKey: 'Portfolio 2' },
  { displayKey: 'Portfolio 3', valueKey: 'Portfolio 3' },
  { displayKey: 'Portfolio 4', valueKey: 'Portfolio 4' },
  { displayKey: 'Portfolio 5', valueKey: 'Portfolio 5' }
]
`;

const FILTERS_MOCK = `
<div filters style="display: flex; flex-direction: row;">
  <crem-dropdown style="margin-right: 8px;"
    [id]="'page-header-dropdown'"
    [placeholder]="'Portfolio'"
    [isSearchable]="true"
    [selectMode]="'single'"
    [dataSource]="${PORTFOLIO_FILTERS}"
    [allowSearch]="true">
  </crem-dropdown>

  <crem-input style="width: 190px;"
    [id]="'page-header-folder-name'"
    [inputType]="'text'"
    [placeholder]="'Folder name'"
  ></crem-input>
</div>
`;

const ACTIONS_MOCK = `
 <div actions style="display: flex; gap: 8px;">
        <crem-icon
        style="margin-top: 6px;"
          *ngIf="showBookmarkButton"
          [icon]="'faStar'"
          [color]="'dark'"
          pack="regular"
        ></crem-icon>
        <crem-button-group
          [stylingMode]="'outlined'"
          [items]="[
          {
            text: 'Active',
            value: 'active',
          },
          {
            text: 'Archived',
            value: 'archived',
          },
          {
            text: 'All',
            value: 'all',
          },
        ]"
        ></crem-button-group>
        <crem-button
          [id]="'page-header-alerts'"
          text="Alerts"
          color="secondary"
        ></crem-button>
        <crem-button
          [id]="'page-header-filters'"
          text="Filters"
          color="secondary"
          icon="faFilter"
          iconSize="xs"
        ></crem-button>
        <crem-button
          [id]="'page-header-more'"
          text="More"
          color="secondary"
          icon="faCaretDown"
          iconPosition="right"
          (buttonClick)="someFunction()"
        ></crem-button>
        <crem-split-button
          [text]="primaryButtonText"
          [icon]="'faCaretDown'"
          [color]="'primary'"
          [disabled]="false"
          [btnStyle]="'flat'"
          [dropdownPosition]="'left'"
          [options]="['Option 1', 'Option 2', 'Option 3']"
        ></crem-split-button>
      </div>
`;

const SETTINGS_MOCK = `
<div settings style="display: flex;">
    <crem-button
        [id]="'page-header-calendar'"
        [ariaLabel]="'calendar-button'"
        [type]="'secondary'"
        [btnStyle]="'basic'"
        [icon]="'faCalendarDay'"
      >
      </crem-button>
  </div>
`;

const meta: Meta<PageHeaderComponent> = {
  component: PageHeaderComponent,
  title: 'Organisms/Page Header *',
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        InputLabelComponent,
        ButtonModule,
        IconModule,
        ButtonGroupComponent,
        DropdownModule,
        InputComponent,
        SplitButtonComponent,
      ],
    }),
  ],
  argTypes: {
    tabTitle: {
      description: 'The title of the current Tab',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: 'EMPTY_STRING',
        },
      },
    },
    pageTitle: {
      description: 'The title of the header',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: 'EMPTY_STRING',
        },
      },
    },
    primaryButtonText: {
      description: 'The primary button text',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: 'EMPTY_STRING',
        },
      },
    },
    showBookmarkButton: {
      description: 'Show the bookmark button',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: false,
        },
      },
    },
    showSettingsButton: {
      description: 'Show the settings button',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: false,
        },
      },
    },
    customActions: {
      description: 'If `true` it displays the actions buttons',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: false,
        },
      },
    },
    customFilters: {
      description:
        'If `true` it shows custom filters. The filters have to be added via a div having the `filters` tag.',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: false,
        },
      },
    },
    customSettings: {
      description:
        'If `true` it shows custom settings. The settings have to be added via a div having the `settings` tag.',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: false,
        },
      },
    },
    search: {
      name: 'onSearchClick()',
      type: 'function',
      description:
        'Dispatch an event of type `string` containing the searched word when the search button is clicked',
      table: {
        category: 'Methods',
      },
    },
    bookmark: {
      name: 'onBookmarkClick()',
      type: 'function',
      description:
        'Dispatch an event of type `Event` when bookmark button is clicked',
      table: {
        category: 'Methods',
      },
    },
    settings: {
      name: 'onBookmarkClick()',
      type: 'function',
      description:
        'Dispatch an event of type `Event` when settings button is clicked',
      table: {
        category: 'Methods',
      },
    },
  },
};

export default meta;

type Story = StoryObj<PageHeaderComponent>;

export const Default: Story = {
  args: {
    tabTitle: 'Lease',
    pageTitle: '3438 Peachtree Rd. NE, Atlanta',
    primaryButtonText: 'Add',
    showBookmarkButton: true,
    showSettingsButton: true,
    showListOrMapViewButtons: true,
    customActions: true,
    customFilters: true,
    customSettings: true,
    statusPill: {
      text: 'Archived',
      type: Pill.DANGER_FILLED,
    },
  },
  render: (args: PageHeaderComponent) => ({
    props: args,
    template: `
    <crem-page-header ${argsToTemplate(args)}>
      ${FILTERS_MOCK}
      ${ACTIONS_MOCK}
      ${SETTINGS_MOCK}
    </crem-page-header>`,
  }),
};
