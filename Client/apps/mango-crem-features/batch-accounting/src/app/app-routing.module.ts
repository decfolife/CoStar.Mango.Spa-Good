import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BatchLogsComponent } from './batch-logs/batch-logs.component';
import { BatchEventListComponent } from './batch-event-list/batch-event-list.component';

const routes: Routes = [
  { path: '', component: BatchLogsComponent },
  { path: 'batchlogs', component: BatchLogsComponent },
  { path: 'batcheventlist', component: BatchEventListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
