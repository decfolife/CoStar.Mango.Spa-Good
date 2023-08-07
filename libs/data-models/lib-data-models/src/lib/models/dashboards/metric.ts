import { Sidekick } from "./sidekick";

export interface Metric {
  id: string;
  title?: string;
  subtitle?: string;
  heroMetric?: string;
  tooltipData?: string;
  sidekick?: Sidekick;
  isActive: boolean;
  elementId: number;
  elementTypeId: number;
}
