import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AmortizationProfilesComponent } from '../amortization-profiles/amortization-profiles.component';
import { DiscountRateProfilesComponent } from '../dr-profiles/discount-rate-profiles.component';
import { DiscountRateProfilesAddEditComponent } from '../dr-profiles/dr-profiles-add-edit/dr-profiles-add-edit.component';
import { JournalEntryProfilesComponent } from '../journal-entry-profiles/journal-entry-profiles.component';

const routes: Routes = [
  {
    path: '',
    component: DiscountRateProfilesComponent,
    data: {
      breadCrumb: {
        label: 'Discount Rate Profiles',
        append: true,
        activeLink: 'Discount Rate Profiles',
      },
    },
  },
  {
    path: 'amortizationprofiles',
    component: AmortizationProfilesComponent,
    data: {
      breadCrumb: {
        label: 'Amortization Profiles',
        append: true,
        activeLink: 'Amortization Profiles',
      },
    },
  },
  {
    path: 'discountrateprofiles/:masterGroupId',
    component: DiscountRateProfilesComponent,
    data: {
      breadCrumb: {
        label: 'Discount Rate Profiles',
        append: true,
        activeLink: 'Discount Rate Profiles',
      },
    },
  },
  {
    path: 'journalentryprofiles',
    component: JournalEntryProfilesComponent,
    data: {
      breadCrumb: {
        label: 'Journal Entry Profiles',
        append: true,
        activeLink: 'Journal Entry Profiles',
      },
    },
  },
  {
    path: 'discountrateprofiles/add/:masterGroupId',
    component: DiscountRateProfilesAddEditComponent,
    data: {
      breadCrumb: {
        label: 'Add Discount Rate Profile',
        append: true,
        activeLink: 'Discount Rate Profiles',
      },
    },
  },
  {
    path: 'discountrateprofiles/edit/:masterGroupId/:policyId',
    component: DiscountRateProfilesAddEditComponent,
    data: {
      breadCrumb: {
        label: 'Edit Discount Rate Profile',
        append: true,
        activeLink: 'Discount Rate Profiles',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule {}
