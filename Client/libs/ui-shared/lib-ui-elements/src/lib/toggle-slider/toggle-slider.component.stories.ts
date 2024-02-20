import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LibDataModelsModule } from '@mango/data-models/lib-data-models';
import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { ToggleSliderComponent } from './toggle-slider.component';

export default {
  title: 'Components/Toggle Slider',
  component: ToggleSliderComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        LibDataModelsModule,
        MatSlideToggleModule
      ],
    }),
  ],
} as Meta<ToggleSliderComponent>;

const Template: Story<ToggleSliderComponent> = (args: ToggleSliderComponent) => ({
  props: args
});

export const Default = Template.bind({});
Default.args = {
  value: true,
  disabled: false,
  dataField: 'Label'
};
