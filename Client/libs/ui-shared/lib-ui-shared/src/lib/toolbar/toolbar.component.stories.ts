import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { ToolbarModuleLink } from '@mango/data-models/lib-data-models';
import { BookmarksModule } from '@mango/ui-shared/lib-ui-elements';
import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { EnvInfoChipModule } from '../env-info-chip/env-info-chip.module';
import { ToolbarComponent } from './toolbar.component';


export default {
  title: 'Organisms/Toolbar',
  component: ToolbarComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule, 
        RouterTestingModule,
        BookmarksModule,
        MatToolbarModule,
        EnvInfoChipModule
      ],
    }),
  ],
} as Meta<ToolbarComponent>;

const Template: Story<ToolbarComponent> = (args: ToolbarComponent) => ({
  props: args,
});


const moduleLinks: ToolbarModuleLink[] = [
  {
    displayOrder: 1,
    moduleDisplayName: 'Projects',
    moduleID: 1,
    securityRightTypeID: 1,
    spaUrl: '/'
  },
  {
    displayOrder: 1,
    moduleDisplayName: 'Strategy',
    moduleID: 1,
    securityRightTypeID: 1,
    spaUrl: '/'
  },
  {
    displayOrder: 1,
    moduleDisplayName: 'Portfolio',
    moduleID: 1,
    securityRightTypeID: 1,
    spaUrl: '/'
  },
  {
    displayOrder: 1,
    moduleDisplayName: 'Accounting',
    moduleID: 1,
    securityRightTypeID: 1,
    spaUrl: '/'
  },
  {
    displayOrder: 1,
    moduleDisplayName: 'Contacts',
    moduleID: 1,
    securityRightTypeID: 1,
    spaUrl: '/'
  },
  {
    displayOrder: 1,
    moduleDisplayName: 'Reports',
    moduleID: 1,
    securityRightTypeID: 1,
    spaUrl: '/'
  },
  {
    displayOrder: 1,
    moduleDisplayName: 'Admin',
    moduleID: 1,
    securityRightTypeID: 1,
    spaUrl: '/'
  }
]

export const Primary = Template.bind({});
Primary.args = {
  chipContent: 'Blank - Dev',
  popoverContent: ["Popober content"],
  moduleLinks,
};
