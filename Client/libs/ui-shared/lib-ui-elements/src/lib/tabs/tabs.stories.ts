import { CommonModule } from "@angular/common";
import { provideAnimations } from "@angular/platform-browser/animations";
import { Meta, StoryObj, applicationConfig, argsToTemplate, moduleMetadata } from "@storybook/angular";
import { CremTabItemComponent } from "./tab-item.component";
import { CremTabsComponent } from "./tabs.component";


const meta: Meta<any> = {
  component: CremTabsComponent,
  title: 'Components/Tabs',
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        CremTabItemComponent
      ],
    }),
    applicationConfig({
      providers: [provideAnimations()]
    })
  ],
  argTypes: {
    id: {
      description: 'The id of the host tab component',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: 'NULL',
        } 
      }
    },
    'id ': {
      description: 'The id of the tab element',
      table: {
        category: '<crem-tab-item>',
        defaultValue: {
          summary: 'NULL',
        } 
      }
    },
    selectedTabIndex: {
      description: 'The index of the selected tab',
      table: {
        category: 'Inputs',
        defaultValue: {
          summary: 0,
        } 
      }
    },
    onSelectedTabChange: {
      description: 'Emits the new selected tab index',
      table: {
        category: 'Outputs',
      }
    },
    title: {
      description: 'The title of the tab item',
      table: {
        category: '<crem-tab-item>',
        defaultValue: {
          summary: null,
        } 
      }
    },
    disabled: {
      description: 'If true the tab item will be disabled',
      table: {
        category: '<crem-tab-item>',
        defaultValue: {
          summary: false,
        } 
      }
    },
  }
}

export default meta;

type Story = StoryObj<CremTabsComponent>;

export const Default: Story = {
  args: {
    id: 'tab-example',
    selectedTabIndex: 0
  },
  render: (args) => {
    return {
      props: args,
      template: `
      <crem-tabs ${argsToTemplate(args)}>
      <crem-tab-item title='Tab 1' id="tab1">
        <h2>Tab 1</h2>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </crem-tab-item>
      <crem-tab-item title='Tab 2'>
        <h2>Tab 2</h2>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </crem-tab-item>
      <crem-tab-item title='Tab 3'>
        <h2>Tab 3</h2>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </crem-tab-item>
      <crem-tab-item title='Tab 4'>
        <h2>Tab 4</h2>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </crem-tab-item>
      </crem-tabs>
      `
    }
  }
}
