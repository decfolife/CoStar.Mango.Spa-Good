import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedService } from './services/shared.service';
import { GroupListResolver } from './resolvers/group-list-resolver.service';
import { PortfolioListResolver } from './resolvers/portfolio-list-resolver.service';
import { UserListResolver } from './resolvers/user-list-resolver.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        SharedService,
        UserListResolver,
        GroupListResolver,
        PortfolioListResolver,
      ],
    };
  }
}
