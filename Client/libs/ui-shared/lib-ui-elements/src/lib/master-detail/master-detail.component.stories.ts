import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { MasterDetailComponent } from './master-detail.component';
import { CommonModule } from '@angular/common';
import {
  DxDataGridModule,
  DxBulletModule,
  DxTemplateModule,
  DxLoadPanelModule,
} from 'devextreme-angular';
import { ButtonModule } from '../button';
import { MASTER_DETAIL_MOCK } from '../../../../../data-models/lib-data-models/src/lib/mocks/master-detail.component.mocks';

export default {
  title: 'Components/Master Detail Grid *',
  component: MasterDetailComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        DxDataGridModule,
        DxBulletModule,
        ButtonModule,
        DxTemplateModule,
        DxLoadPanelModule
      ],
    }),
  ],
  argTypes: {
    id: {
      description: 'The id of the host component',
      table: {
        defaultValue: {
          summary: 'NULL',
        },
      },
    },
    content: {
      description: 'The content to be displayed in the grid.',
      table: {
        defaultValue: {
          summary: 'NULL',
        },
      },
    },
    keyExpr: {
      description:
        'Specifies the key property (or properties) that provide(s) key values to access data items',
      table: {
        defaultValue: {
          summary: 'NULL',
        },
      },
    },
    allowedPageSizes: {
      description:
        'Specifies the available page sizes in the page size selector.',
      table: {
        type: {
          summary: '[] of string | number',
        },
        defaultValue: {
          summary: ['[25, 50, 100, 500, "all"]'],
        },
      },
    },
    showPageSizeSelector: {
      description: 'Specifies whether to show the page size selector',
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    showPageInfo: {
      description: 'Specifies whether to show the page information',
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    showNavButtons: {
      description: 'Specifies whether to show navigation buttons',
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    defaultPageSize: {
      description:
        'Specifies how many records to show by default on component load',
      table: {
        defaultValue: {
          summary: '10',
        },
      },
    },
    columnsToHide: {
      description:
        'Specifies which columns to hide on the grid from the data source.',
      table: {
        defaultValue: {
          summary: ['["id", "childData"]'],
        },
      },
    },
    selectedRows: {
      description: 'Array which stores all the selected rows from the grid',
      table: {
        type: {
          summary: 'any[]',
        },
        defaultValue: {
          summary: ['[]'],
        },
      },
    },
    onContentReady: {
      description: 'Executes when the grid and grid content is ready.',
      table: {
        type: {
          summary: '() => void',
        },
      },
    },
    selectionChangedHandler: {
      description:
        'Executes and passes an event when there is a change in grid row selection.',
      table: {
        type: {
          summary: '(event: ) => void',
        },
      },
    },
    masterGrid: {
      description: 'Gives access to the grid via @viewChild()',
      table: {
        type: {
          summary: 'DxDataGridComponent',
        },
      },
    },
    allowColumnReordering: {
      description:
        'Set the allowColumnReordering property to true to allow a user to reorder columns',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: true,
        },
      },
    },
    columnAutoWidth: {
      description:
        'Property to make all columns adjust their widths to their content',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: false,
        },
      },
    },
    rowAlternationEnabled: {
      description:
        'Specifies whether rows should be shaded differently.',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: true,
        },
      },
    },
    showRowLines: {
      description:
        'Specifies whether horizontal lines that separate one row from another are visible',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: true,
        },
      },
    },
    showColumnLines: {
      description:
        'Specifies whether vertical lines that separate one column from another are visible',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: false,
        },
      },
    },
  },
} as Meta<MasterDetailComponent>;

const Template: Story<MasterDetailComponent> = (
  args: MasterDetailComponent
) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  id: '1',
  content: MASTER_DETAIL_MOCK,
  keyExpr: 'id',
  allowedPageSizes: [25, 50, 100, 500, 'all'],
  showPageSizeSelector: true,
  showPageInfo: true,
  showNavButtons: true,
  columnsToHide: ['id', 'childData'],
  defaultPageSize: '10',
  allowColumnReordering: true,
  columnAutoWidth: false,
  showRowLines: true,
  showColumnLines: false,
  rowAlternationEnabled: true
};
