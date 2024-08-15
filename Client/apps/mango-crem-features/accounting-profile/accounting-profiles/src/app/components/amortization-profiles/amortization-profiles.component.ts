import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BaseService } from '../../services/base.service';

@Component({
  selector: 'app-amortization-profiles',
  templateUrl: './amortization-profiles.component.html',
  styleUrls: ['./amortization-profiles.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AmortizationProfilesComponent implements OnInit {
  hasModuleRights = true;

  constructor(    
    private baseService: BaseService
  ) { }

  ngOnInit(): void {
    this.baseService.HasUserModuleRight().subscribe(response => {
      this.hasModuleRights = response;
    });
  }

}
