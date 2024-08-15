import { CommonModule } from '@angular/common';
import { Meta, StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { ButtonModule } from '../button';
import { ButtonGroupComponent } from '../button-group/button-group.component';
import { IconModule } from '../icon';
import { InputLabelComponent } from '../input/label';
import { PageHeaderComponent } from './page-header.component';
import { DropdownModule } from '../dropdown';

const PORTFOLIO_FILTERS = `
[
  { displayKey: 'Portfolio 1', valueKey: 'Portfolio 1' },
  { displayKey: 'Portfolio 2', valueKey: 'Portfolio 2' },
  { displayKey: 'Portfolio 3', valueKey: 'Portfolio 3' },
  { displayKey: 'Portfolio 4', valueKey: 'Portfolio 4' },
  { displayKey: 'Portfolio 5', valueKey: 'Portfolio 5' }
]
`

const YEARS_FILTERS = `
[
  { displayKey: '2024', valueKey: '2024' },
  { displayKey: '2023', valueKey: '2023' },
  { displayKey: '2022', valueKey: '2022' },
  { displayKey: '2021', valueKey: '2021' },
  { displayKey: '2020', valueKey: '2020' }
]
`

const FILTERS_MOCK = `
<div filters style="display: flex; flex-direction: row;">
<crem-dropdown style="margin-right: 8px"
  [placeholder]="'Portfolio'"
  [isSearchable]="true"
  [selectMode]="'single'"
  [dataSource]="${PORTFOLIO_FILTERS}"
  [allowSearch]="true">
  </crem-dropdown>

  <crem-dropdown style="margin-right: 8px" [placeholder]="'Year'"
  [isSearchable]="true"
  [selectMode]="'single'"
  [dataSource]="${YEARS_FILTERS}"
  [allowSearch]="true">
  </crem-dropdown>

  <crem-button text="Apply" color="secondary"></crem-button>
</div>`

const SETTINGS_MOCK = `
<div settings>
    <crem-button-group [items]="[
      {
        value: 'list-view',
        icon: 'bulletlist'
      },
      {
        value: 'board-view',
        icon: 'columnfield'
      },
      {
        value: 'cal-view',
        icon: 'event'
      },
    ]"></crem-button-group>
  </div>
`

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
        DropdownModule
      ],
    }),
  ],
  argTypes: {
    pageTitle: {
      description: 'The title of the header',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: 'EMPTY_STRING'
        }
      }
    },
    showTitleInfo: {
      description: 'Show the info icon next to the title',
      table: {
         category: 'Inputs',
        defaultValue: {
          summary: false
        }
      }
    },
    primaryButtonText: {
      description: 'The primary button text',
      table: {
         category: 'Inputs',
        defaultValue: {
          summary: 'EMPTY_STRING'
        }
      }
    },
    showSearchButton: {
      description: 'Show the search button next to the title',
      table: {
         category: 'Inputs',
        defaultValue: {
          summary: false
        }
      }
    },
    showBookmarkButton: {
      description: 'Show the bookmark button',
      table: {
         category: 'Inputs',
        defaultValue: {
          summary: false
        }
      }
    },
    showSettingsButton: {
      description: 'Show the settings button',
      table: {
         category: 'Inputs',
        defaultValue: {
          summary: false
        }
      }
    },
    customActions: {
      description: 'If `true` it displays the actions buttons',
      table: {
         category: 'Inputs',
        defaultValue: {
          summary: false
        }
      }
    },
    customFilters: {
      description: 'If `true` it shows custom filters. The filters have to be added via a div having the `filters` tag.',
      table: {
         category: 'Inputs',
        defaultValue: {
          summary: false
        }
      }
    },
    customSettings: {
      description: 'If `true` it shows custom settings. The settings have to be added via a div having the `settings` tag.',
      table: {
         category: 'Inputs',
        defaultValue: {
          summary: false
        }
      }
    },
    search: {
      name: 'onSearchClick()',
      type: 'function',
      description: 'Dispatch an event of type `string` containing the searched word when the search button is clicked',
      table: {
        category: 'Methods',
      }
    },
    bookmark: {
      name: 'onBookmarkClick()',
      type: 'function',
      description: 'Dispatch an event of type `Event` when bookmark button is clicked',
      table: {
        category: 'Methods',
      }
    },
    settings: {
      name: 'onBookmarkClick()',
      type: 'function',
      description: 'Dispatch an event of type `Event` when settings button is clicked',
      table: {
        category: 'Methods',
      }
    }
  },
};

export default meta;

type Story = StoryObj<PageHeaderComponent>;

export const Default: Story = {
  args: {
    pageTitle: 'Building Details',
    showTitleInfo: true,
    primaryButtonText: 'Add',
    showSearchButton: true,
    showBookmarkButton: true,
    showSettingsButton: true,
    customActions: true,
    customFilters: true,
    customSettings: true,
  },
  render: (args: PageHeaderComponent) => ({
    props: args,
    template: `
    <crem-page-header ${argsToTemplate(args)}>
      ${FILTERS_MOCK}
      ${SETTINGS_MOCK}
    </crem-page-header>`
  })
}