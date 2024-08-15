import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { HeroMetricComponent } from './hero-metric.component';
import { MatCardModule } from '@angular/material/card';
import { TooltipModule } from '../tooltip/tooltip.module';
import { IconModule } from '../icon';

const meta: Meta<HeroMetricComponent> = {
  title: 'Components/Hero Metrics *',
  component: HeroMetricComponent,
  decorators: [
    moduleMetadata({
      imports: [
        MatCardModule,
        TooltipModule,
        IconModule
      ],
    }),
  ],
  argTypes: {
    metric: {
      description: 'Represents a metric or a set of metrics, displaying key performance indicators with additional details. You can edit the raw data to see it displayed. The `sidekick` object has two properties that affect the look of the detail: `symbol: positive | negative` and `direction: up | down | neutral` ',
      control: 'object',
      subproperties: {
        id: { control: 'text' },
        title: { control: 'text' },
        subtitle: { control: 'text' },
        heroMetric: { control: 'text' },
        tooltipData: { control: 'text' },
        sidekick: {
          control: 'object',
          subproperties: {
            metricValue: { control: 'text' },
            symbol: { control: 'radio', options: ['positive', 'negative'] },
            direction: { control: 'radio', options: ['up', 'down', 'neutral'] }
          }
        },
        isActive: { control: 'boolean' },
        elementId: { control: 'number' },
        elementTypeId: { control: 'number' }
      }
    }
  }
};

export default meta;

type Story = StoryObj<HeroMetricComponent | any>;

export const Default: Story = {
  args: {
    metric: {
      id: '23',
      title: 'Active Projects',
      subtitle: '2,660 Days',
      heroMetric: '346',
      tooltipData: 'There are currently 346 active projects in the portfolio. In the last 30 days, 63 new projects were started, and 0 were completed.',
      sidekick: {
        metricValue: '63',
        symbol: 'positive',
        direction: 'up'
      },
      isActive: true,
      elementId: 1,
      elementTypeId: 1
    },
  }
}


export const Multiple: Story = {
  args: {
    metrics: [{
      id: '1',
      title: 'Active Projects',
      subtitle: '2,660 Days',
      heroMetric: '346',
      tooltipData: 'There are currently 346 active projects in the portfolio. In the last 30 days, 63 new projects were started, and 0 were completed.',
      sidekick: {
        metricValue: '63',
        symbol: 'positive',
        direction: 'up'
      },
      isActive: true,
      elementId: 1,
      elementTypeId: 1
    },
    {
      id: '2',
      title: 'Overdue Projects',
      subtitle: '3605 Days',
      heroMetric: '84',
      tooltipData: 'There are currently 84 overdue projects, which are overdue by an average of 3,605 days',
      sidekick: null,
      isActive: true,
      elementId: 2,
      elementTypeId: 1
    },
    {
      id: '3',
      title: 'Overdue Tasks',
      subtitle: 'Avg. 3,507 Days / 76 Projects',
      heroMetric: '1432',
      tooltipData: 'There are currently 1,432 overdue tasks, which are overdue by an average of 3,507 days, spanning 76 projects.',
      sidekick: null,
      isActive: true,
      elementId: 2,
      elementTypeId: 1
    },
    {
      id: '4',
      title: 'Projects Per Manager',
      subtitle: '4.1 Months',
      heroMetric: '40.5',
      tooltipData: 'On average, each project manager manages 40.5 active projects, and each project averages a 4.1 month duration.',
      sidekick:  {
        metricValue: '15',
        symbol: 'negative',
        direction: 'down'
      },
      isActive: true,
      elementId: 2,
      elementTypeId: 1
    }
  ],
  },
  render: (args) => ({
    props: args,
    template: `
    <div style="width: 100%">
    <crem-metric *ngFor="let metric of metrics" [metric]="metric"></crem-metric>
    </div>
    
    `
  })
}
