import { BatchEventListComponent } from '../batch-event-list/batch-event-list.component';
import { BatchLogsComponent } from '../batch-logs/batch-logs.component';

export const ROUTES = [
  {
    path: '',
    component: BatchLogsComponent,
    data: {
      breadCrumb: { label: 'Batch Accounting', append: true, activeLink: 'Batch Accounting' }
    }
  },
  {
    path: 'batchlogs',
    component: BatchLogsComponent,
    data: {
      breadCrumb: { label: 'Batch Logs', append: true, activeLink: 'Batch Logs' }
    }
  }, // todo: remove once fully moved to MangoSpa, redundant
  {
    path: 'batcheventlist', component: BatchEventListComponent,
    data: {
      breadCrumb: { label: 'Batch Event List', append: true, activeLink: 'Batch Event List' }
    }
  },
]
