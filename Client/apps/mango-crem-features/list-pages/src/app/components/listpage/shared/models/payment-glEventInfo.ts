import { ChargeDetails } from './payment-chargeDetails';
import { PaymentProcessings } from './payment-Processings';
import { PaymentHistoryItems } from './payment-historyItems';
import { PortfolioSegments } from './portfolioSegments';
import { ChargeAllocations } from './payment-chargeAllocations';

export interface GLEventInfo {
  chargeDetails: ChargeDetails;
  paymentProcessings: PaymentProcessings[];
  paymentHistoryItems: PaymentHistoryItems[];
  portfolioSegments: PortfolioSegments[];
  chargeAllocations: ChargeAllocations[];
}
