import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { Meta, StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { DxBulletModule, DxDataGridModule, DxPopoverModule, DxTemplateModule } from 'devextreme-angular';
import { FieldHistoryComponent } from './field-history.component';
import { IconModule } from '../icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextBoxModule } from '../text-box';
import { FieldHistoryDirective } from './field-history.directive';



const meta: Meta<any> = {
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

    dataSource: {
      description: 'todo: complete the docs',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: null,
        } 
      }
    },

    "history-http-source": {
      description: '<b>doc</b> the directive plx',
      table: {
        category: 'Directives',
        defaultValue: {
          summary: null,
        } 
      }
    },


    /* pageTitle: {
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
    }
  },*/
}};

export default meta;

type Story = StoryObj<FieldHistoryComponent>;

export const Default: Story = {
  args: {
    helpTextID: 'help-text-1',
    visible: false,
    dateFormat: 'MM/dd/yyyy h:mm a',
    dataSource: {
      helpTextPage: '',
      helpTextSubject: 'Lease Terms',
      helpTextName: 'LeaseYears',
      helpTextText: 'Edit the first lease year, if needed and then click generate to produce a regular lease year calendar for the term of the lease. The lease year does not affect the breakpoint schedule. If the lease year is more or less than a calendar year, you may have to calculate the breakpoint for that lease year using your preferred pro ration method.',
      helpTextImage: '',
      helpTextHistory: [{
        id: 'gethelp',
        lastModified: '1/10/1994',
        lastModifiedBy: 'Barbara G',
        displayName: 'Get Help',
        afterChange: 'This is helptext'
      }, {
        id: 'gothelp',
        lastModified: '1/10/2000',
        lastModifiedBy: 'Allen Q',
        displayName: 'Got Help',
        afterChange: 'This was helptext'
      }, {
        id: 'willgethelp',
        lastModified: '1/10/2022',
        lastModifiedBy: 'Xavier S',
        displayName: 'Will Get Help',
        afterChange: 'This will be helptext'
      },
    {
      id: 'cantgethelp',
      lastModified: '1/10/2022',
      lastModifiedBy: 'Xavier S',
      displayName: 'Cant Get Help',
      afterChange: 'This cant be helptext'
    },
    {
      id: 'mightgethelp',
      lastModified: '1/10/2023',
      lastModifiedBy: 'Xavier S',
      displayName: 'Might Get Help',
      afterChange: 'This might be helptext'
    },
    {
      id: 'wantstogethelp',
      lastModified: '1/10/2024',
      lastModifiedBy: 'Xavier S',
      displayName: 'Wants to Get Help',
      afterChange: 'This wants to be helptext'
    },
    {
      id: 'needstogethelp',
      lastModified: '1/10/2025',
      lastModifiedBy: 'Xavier S',
      displayName: 'Needs to Get Help',
      afterChange: 'This needs to be helptext'
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
    <crem-field-history ${argsToTemplate(args)}></crem-field-history></div>
    `
  })
}