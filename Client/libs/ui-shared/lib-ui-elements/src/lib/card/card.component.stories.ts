import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CardComponent } from './card.component';

export default {
  title: 'Components/Organisms/Card',
  component: CardComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<CardComponent>;

const Template: Story<CardComponent> = (args: CardComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  id: '',
  title: '',
  subtitle: '',
  customDropdownMenu: false,
  showCustomHeader: false,
  showFilterClearButton: false,
  filterData: [],
  moreOptions: '',
  pendoTitleId: '',
  counter: 0,
  exportId: '',
  dropDisplay: '',
  dropValue: '',
  dropdownPlaceholder: '',
};
