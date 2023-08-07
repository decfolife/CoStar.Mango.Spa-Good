import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogiReportsLandingPageComponent } from './logi-reports-landing-page.component';


const routes: Routes = [
  { path: '', component: LogiReportsLandingPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogiReportsLandingModule { }
