import { HeroMetricComponent } from './hero-metric.component';

jest.mock('@angular/core');
jest.mock('@mango/data-models/lib-data-models');

describe('HeroMetricComponent', () => {
  let instance;

  beforeEach(() => {
    instance = new HeroMetricComponent();
  });

  it('instance should be an instanceof HeroMetricComponent', () => {
    expect(instance instanceof HeroMetricComponent).toBeTruthy();
  });

});