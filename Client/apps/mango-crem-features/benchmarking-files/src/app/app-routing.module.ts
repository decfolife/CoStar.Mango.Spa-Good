import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BenchmarkingFilesComponent } from './components/benchmarking-files/benchmarking-files.component';

const routes: Routes = [
  {
    path: '',
    component: BenchmarkingFilesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
