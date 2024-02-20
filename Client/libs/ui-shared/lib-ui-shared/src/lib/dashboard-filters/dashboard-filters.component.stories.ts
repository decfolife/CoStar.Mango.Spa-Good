import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { DashboardFiltersComponent } from './dashboard-filters.component';
import { LibUiElementsModule } from '@mango/ui-shared/lib-ui-elements';
import { MatMenuModule } from '@angular/material/menu';
import { FormWizardAppModule } from '../../../../../../apps/mango-crem-features/micro-components/src/app/form-wizard/form-wizard.module';
import { AddFormWizardModule } from '@micro-components/form-wizard/modal/add-form-wizard/add-form-wizard.module';


export default {
  title: 'Organisms/Dashboard Filters',
  component: DashboardFiltersComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, LibUiElementsModule, MatMenuModule, FormWizardAppModule, AddFormWizardModule],
    }),
  ],
} as Meta<DashboardFiltersComponent>;

const Template: Story<DashboardFiltersComponent> = (args: DashboardFiltersComponent) => ({
  props: args,
});

export const Primary = Template.bind({});
Primary.args = {
  showAddButton: true,
  showEnterBill: true,
  addObjects: "",
  filters: null,
  dashboardId: "dashboard-id",
  isDateEU: false,
  cachingEnabled: false,
  objectTypeId: [1,2 ],
  objectTypeName: "Object Type Name",
  userId: 0,
};
