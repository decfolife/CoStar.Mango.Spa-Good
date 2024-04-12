import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { Meta, StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { DxBulletModule, DxDataGridModule, DxPopoverModule, DxTemplateModule } from 'devextreme-angular';
import { FieldHistoryComponent } from './field-history.component';
import { IconModule } from '../icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextBoxModule } from '../text-box';
import { FieldHistoryDirective } from './field-history.directive';



const meta: Meta<FieldHistoryComponent> = {
  component: FieldHistoryComponent,
  title: 'Organisms/Field History',
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        DxDataGridModule,
        BrowserAnimationsModule,
        DxTemplateModule,
        DxBulletModule,
        DxPopoverModule,
        MatTabsModule,
        IconModule,
        TextBoxModule,
        FieldHistoryDirective
      ],
    }),
  ],
  argTypes: {
    /*helpTextID: ,
    dateFormat: ,
    dataSource: ,*/

    /*pageTitle: {
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
    onSearchClick: {
      name: 'onSearchClick()',
      type: 'function',
      description: 'Dispatch an event of type `string` containing the searched word when the search button is clicked',
      table: {
        category: 'Methods',
      }
    },
    onBookmarkClick: {
      name: 'onBookmarkClick()',
      type: 'function',
      description: 'Dispatch an event of type `Event` when bookmark button is clicked',
      table: {
        category: 'Methods',
      }
    },
    onSettingsClick: {
      name: 'onBookmarkClick()',
      type: 'function',
      description: 'Dispatch an event of type `Event` when settings button is clicked',
      table: {
        category: 'Methods',
      }
    }*/
  },
};

export default meta;

type Story = StoryObj<FieldHistoryComponent>;

export const Default: Story = {
  args: {
    helpTextID: 'help-text-1',
    visible: false,
    dateFormat: 'MM/dd/yyyy h:mm a',
    dataSource: {
      fieldIdData: 'LeaseYears',
      fieldTitleData: 'Lease Terms',
      helpTextData: 'Edit the first lease year, if needed and then click generate to produce a regular lease year calendar for the term of the lease. The lease year does not affect the breakpoint schedule. If the lease year is more or less than a calendar year, you may have to calculate the breakpoint for that lease year using your preferred pro ration method.',
      historyData: [{
        id: 'gethelp',
        date: '1/10/1994',
        user: 'Barbara G',
        field: 'Get Help',
        value: 'This is helptext'
      }, {
        id: 'gothelp',
        date: '1/10/2000',
        user: 'Allen Q',
        field: 'Got Help',
        value: 'This was helptext'
      }, {
        id: 'willgethelp',
        date: '1/10/2022',
        user: 'Xavier S',
        field: 'Will Get Help',
        value: 'This will be helptext'
      },
    {
      id: 'cantgethelp',
      date: '1/10/2022',
      user: 'Xavier S',
      field: 'Cant Get Help',
      value: 'This cant be helptext'
    },
    {
      id: 'mightgethelp',
      date: '1/10/2023',
      user: 'Xavier S',
      field: 'Might Get Help',
      value: 'This might be helptext'
    },
    {
      id: 'wantstogethelp',
      date: '1/10/2024',
      user: 'Xavier S',
      field: 'Wants to Get Help',
      value: 'This wants to be helptext'
    },
    {
      id: 'needstogethelp',
      date: '1/10/2025',
      user: 'Xavier S',
      field: 'Needs to Get Help',
      value: 'This needs to be helptext'
    }
  ]
    }

  },
  render: (args: FieldHistoryComponent) => ({
    props: args,
    template: `
    <div style="display: flex">
      <crem-text-box
        [value]="'Field Data'"
        [initialFocus]="null"
        [disabled]="false"
      ></crem-text-box>
    <crem-field-history [history-http-source]="{
      portfolioId: '',
      OTID: '',
      objectID: ''
    }"
     ${argsToTemplate(args)}></crem-field-history></div>
    `
  })
}