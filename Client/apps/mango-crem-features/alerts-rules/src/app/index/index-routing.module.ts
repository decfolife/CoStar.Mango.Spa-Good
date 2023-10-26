import { AppComponent } from '@alerts-rules/app.component';
import { AppModule } from '@alerts-rules/app.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: AppComponent,
  data: {
    breadCrumb: { label: 'Alert Rules', append: true }
  }
}]

@NgModule({
  imports: [CommonModule, AppModule, RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class IndexRoutingModule { }
