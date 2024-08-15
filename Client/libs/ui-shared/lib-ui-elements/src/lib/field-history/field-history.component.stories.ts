import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { Meta, StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';
import { DxBulletModule, DxDataGridModule, DxPopoverModule, DxTemplateModule } from 'devextreme-angular';
import { FieldHistoryComponent } from './field-history.component';
import { IconModule } from '../icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FieldHistoryDirective } from './field-history.directive';
import { InputComponent } from '../input';

const meta: Meta<any> = {
  component: FieldHistoryComponent,
  title: 'Organisms/Field History *',
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
        InputComponent,
        FieldHistoryDirective
      ],
    }),
  ],
  argTypes: {

    visible: {
      description: 'Toggles the visibility of the tip',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: false,
        } 
      }
    },

    helpTextID: {
      description: 'Unique identifier for the helptext',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: null,
        } 
      }
    },

    dateFormat: {
      description: 'Format of the displayed date',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: null,
        } 
      }
    },

    dataSource: {
      description: 'Can be hardcoded using a dataSource object to be displayed inside the `History` tab grid. ',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: null,
        } 
      }
    },

    "history-http-source": {
      name: 'history-http-source',
      description: 'Custom directive that can be used for API calls to populate the dataSource from the database using the following paremeters: `portfolioId`, `helpTextName`, `objectTypeId`, `objectId` <br><br> `${FIELDHISTORY_MOCK}`',
      table: {
        category: 'Directives',
        defaultValue: {
          summary: null,
        }
      }
    },

    toggleVisible: {
      name: 'toggleVisible()',
      type: 'function',
      description: 'Dispatch an event of type `boolean` when field-hisotry icon is clicked.',
      table: {
        category: 'Methods',
      }
    },

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
    <crem-input   [inputType]="'text'" [value]="'Field Data'"></crem-input>
    <crem-field-history ${argsToTemplate(args)}></crem-field-history></div>
    `
  })
  
}