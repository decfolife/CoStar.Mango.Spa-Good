import { InputInfoComponent } from './info.component';

jest.mock('@angular/core');
jest.mock('@angular/common');
jest.mock('../../icon');

describe('InputInfoComponent', () => {
  let instance;

  beforeEach(() => {
    instance = new InputInfoComponent();
  });

  it('instance should be an instanceof InputInfoComponent', () => {
    expect(instance instanceof InputInfoComponent).toBeTruthy();
  });
});