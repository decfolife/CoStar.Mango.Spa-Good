
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';
import { AccountsSummaryComponent } from "../accounts-summary/accounts-summary.component";

const routes: Routes = [
  {
     path: '', 
     component: IndexComponent,
     children: [
      { path: '', component: AccountsSummaryComponent },
     ]    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule {}
