/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable lines-between-class-members */
/* eslint-disable import/prefer-default-export */

// Amortizations Associated with Discount Rate Profile
export class DiscountRateAssociatedSchedules {
  scheduled: number;
  historical: number;
  inProcess: number;
  remeasures: number;

  constructor(scheduled, historical, inProcess, remeasures) {
    this.scheduled = scheduled;
    this.historical = historical;
    this.inProcess = inProcess;
    this.remeasures = remeasures;
  }

  total() {
    return this.scheduled + this.historical + this.inProcess + this.remeasures;
  }
}
