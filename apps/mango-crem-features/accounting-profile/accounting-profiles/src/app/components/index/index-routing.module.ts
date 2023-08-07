import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AmortizationProfilesComponent } from '../amortization-profiles/amortization-profiles.component';
import { DiscountRateProfilesComponent } from '../dr-profiles/discount-rate-profiles.component';
import { DiscountRateProfilesAddEditComponent } from '../dr-profiles/dr-profiles-add-edit/dr-profiles-add-edit.component';
import { JournalEntryProfilesComponent } from '../journal-entry-profiles/journal-entry-profiles.component';
import { IndexComponent } from './index.component';

const routes: Routes = [
  { path: '', component: IndexComponent,
  children: [
    { path: 'discountrateprofiles', component: DiscountRateProfilesComponent },
    { path: 'amortizationprofiles', component: AmortizationProfilesComponent },
    { path: 'discountrateprofiles/:masterGroupId', component: DiscountRateProfilesComponent },
    { path: 'journalentryprofiles', component: JournalEntryProfilesComponent },
    {
      path: 'discountrateprofiles/add/:masterGroupId',
      component: DiscountRateProfilesAddEditComponent
    },
    {
      path: 'discountrateprofiles/edit/:masterGroupId/:policyId',
      component: DiscountRateProfilesAddEditComponent
    },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule { }
