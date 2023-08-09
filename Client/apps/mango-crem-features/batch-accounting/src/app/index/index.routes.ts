import { BatchEventListComponent } from '../batch-event-list/batch-event-list.component';
import { BatchLogsComponent } from '../batch-logs/batch-logs.component';

export const ROUTES = [
  { path: '', component: BatchLogsComponent },
  { path: 'batchlogs', component: BatchLogsComponent }, // todo: remove once fully moved to MangoSpa, redundant
  { path: 'batcheventlist', component: BatchEventListComponent },
]
