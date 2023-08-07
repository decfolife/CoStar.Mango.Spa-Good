import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { BookmarksComponent } from './bookmarks.component';

export default {
  title: 'Components/Organisms/Bookmarks',
  component: BookmarksComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    }),
  ],
} as Meta<BookmarksComponent>;

const Template: Story<BookmarksComponent> = (args: BookmarksComponent) => ({
  props: args,
  template: `
    <crem-bookmarks [bookmarkGroups]="bookmarkGroups" [useRouterOutletTag]="false"></crem-bookmarks>
  `,
});

export const Primary = Template.bind({});
Primary.args = {
  bookmarkGroups: [],
  useRouterOutletTag: false,
};
