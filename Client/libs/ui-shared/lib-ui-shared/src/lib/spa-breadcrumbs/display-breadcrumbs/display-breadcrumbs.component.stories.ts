import { CommonModule } from '@angular/common';
import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { DisplayBreadcrumbsComponent } from './display-breadcrumbs.component';
import { BreadCrumb } from '@mango/data-models/lib-data-models';

export default {
  title: 'Organisms/Breadcrumb',
  component: DisplayBreadcrumbsComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
} as Meta<DisplayBreadcrumbsComponent>;

const Template: Story<DisplayBreadcrumbsComponent> = (args: DisplayBreadcrumbsComponent) => ({
  props: args,
});

const breadcrumbs: BreadCrumb[] = [
  {
    label: 'Portfolio',
    url: '/',
    activeLink:
      'Portfolio',
    params: null
  },
  {
    label: 'Dashboard',
    url: '/',
    activeLink:
      'Dashboard',
    params: null
  },
  {
    label: 'Lease 1',
    url: '/',
    activeLink:
      'Lease 1',
    params: null
  }
]
export const Primary = Template.bind({});
Primary.args = {
  breadcrumbs
};
