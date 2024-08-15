import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { CompositeDropdownComponent } from './composite-dropdown.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Components/Composite Dropdown *',
  component: CompositeDropdownComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        MatExpansionModule,
        BrowserAnimationsModule
      ],
    }),
  ],

  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} as Meta<CompositeDropdownComponent>;

const Template: Story<CompositeDropdownComponent> = (args) => ({
  props: args,
  template: `<crem-composite-dropdown
    [Id]="Id"
    [isOpen]="isOpen"
    [closeOnOutsideClick]="closeOnOutsideClick"
    [showSubtitle]="showSubtitle"
    [showFooter]="showFooter"
    [isFormValid]="isFormValid"
    [Title]="Title"
    [SubTitle]="SubTitle"
    [FooterContent]="FooterContent">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </crem-composite-dropdown>`
});

export const Default = Template.bind({});
Default.args = {
  Id: "compositeDropdown",
  isOpen: false,
  closeOnOutsideClick: true,
  showSubtitle: true,
  showFooter: true,
  isFormValid: true,
  Title: "Composite Dropdown",
  SubTitle: "Composite Dropdown Subtitle",
  FooterContent: "Composite Dropdown Footer",
};