import { TooltipComponent } from './tooltip.component';

jest.mock('@angular/core');

describe('TooltipComponent', () => {
  let instance;

  beforeEach(() => {
    instance = new TooltipComponent();
  });

  it('instance should be an instanceof TooltipComponent', () => {
    expect(instance instanceof TooltipComponent).toBeTruthy();
  });

});