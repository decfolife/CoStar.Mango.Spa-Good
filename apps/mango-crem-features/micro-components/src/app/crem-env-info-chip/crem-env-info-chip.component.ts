import { Component, OnInit } from '@angular/core';
import { CremEnvChipService } from './crem-env-info-chip.service';

@Component({
  selector: 'mango-crem-env-info-chip',
  templateUrl: './crem-env-info-chip.component.html',
  styleUrls: ['./crem-env-info-chip.component.css'],
})
export class CremEnvInfoChipAppComponent implements OnInit {
  // chip items
  chipContent: string;
  popoverContent: string[];
  id = 'cremChip';
  chipStyle: ChipStyle = {
    type: 'secondary',
    color: 'costar',
  };

  constructor(private chipService: CremEnvChipService) {
    this.chipContent = this.chipService.getEnvironment();
    this.popoverContent = this.chipService.getDbRestore();

    // this.chipContent = 'Dev - Retaildemo';
    // eslint-disable-next-line max-len
    // this.popoverContent = ['Backup File Name: E:RetailDemo_BackupsFULL_DEV_VP_RETAILDEMO_V05_20200930_020000.sqb','Database Restore Date: 2020-09-30 11:17:54',' Database Backup Date: 2020-09-30 02:00:50 ']
  }

  ngOnInit(): void { }
  
}

export interface ChipStyle {
  type: string;
  color: string;
}
