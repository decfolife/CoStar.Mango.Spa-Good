import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { SimpleGridComponent } from './simple-grid.component';

export default {
  title: 'Components/Organisms/Simple Grid',
  component: SimpleGridComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
  argTypes: {
    keyExpr: { control: 'string', defaultValue: 'Test' },
  }
} as Meta<SimpleGridComponent>;

const Template: Story<SimpleGridComponent> = (args: SimpleGridComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  id: '',
  dataSource: [],
  paging: true,
  allowSorting: true,
  buttonColumn: false,
  allowColumnReordering: false,
  enableMasterDetails: false,
  pageSize: 50,
  customPageSize: [50, 100, 200, 500],
  exportFileName: 'Grid_Export',
  gridHeight: '',
  keyExpr: null,
};
