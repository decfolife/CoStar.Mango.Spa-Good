
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';
import { AccountsSummaryComponent } from "../accounts-summary/accounts-summary.component";
import { AddEventComponent } from '../add-event/add-event.component';

const routes: Routes = [
  {
     path: '', 
     component: IndexComponent,
     children: [
      { path: '', component: AccountsSummaryComponent },
      { path: 'addEvent', component: AddEventComponent },
     ]    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule {}
