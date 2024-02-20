import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ScreenLoaderComponent } from './screen-loader.component';
import { CommonModule } from '@angular/common';
import { DxLoadIndicatorModule } from 'devextreme-angular';

export default {
  title: 'Components/Spinner',
  component: ScreenLoaderComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, DxLoadIndicatorModule],
    }),
  ],
} as Meta<ScreenLoaderComponent>;

const Template: Story<ScreenLoaderComponent> = (args: ScreenLoaderComponent) => ({
  props: args,
});

export const Default = Template.bind({});
Default.args = {};
