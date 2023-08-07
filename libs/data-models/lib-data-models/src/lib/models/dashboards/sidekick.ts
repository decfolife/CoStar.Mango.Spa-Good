export interface Sidekick {
  metricValue?: string;
  valueIndicator?:
    | 'positive-up'
    | 'positive-down'
    | 'neutral'
    | 'negative-up'
    | 'negative-down'
    | null;
}
