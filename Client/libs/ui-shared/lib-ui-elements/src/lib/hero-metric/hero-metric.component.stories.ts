import { moduleMetadata, Story, Meta } from '@storybook/angular';

import { HeroMetricComponent } from './hero-metric.component';
import { MatCardModule } from '@angular/material/card';
import { TooltipBasicModule } from '../tooltip-basic/tooltip-basic.module';

export default {
  title: 'Components/Organisms/Hero Metrics',
  component: HeroMetricComponent,
  decorators: [
    moduleMetadata({
      imports: [
        MatCardModule,
        TooltipBasicModule,
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
} as Meta<HeroMetricComponent>;

const Template: Story = ( args ) => ({
  ...HeroMetricComponent,
  props: { metric: {...args} },
});

export const Default = Template.bind({});
Default.args = {
  id: '23',
  title: 'Active Projects',
  subtitle: '2,660 Days',
  heroMetric: '346',
  tooltipData	:	`
    There are currently 346 active projects in the portfolio. In the last 30 days, 63 new projects were started, and 0 were completed.
  `,
  sidekick: {
    metricValue: '63',
    valueIndicator: 'positive-up',
  },
  isActive: true,
  elementId: 1,
  elementTypeId: 1,
};