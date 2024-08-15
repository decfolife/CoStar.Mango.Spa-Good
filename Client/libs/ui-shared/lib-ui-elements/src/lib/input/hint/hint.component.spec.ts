import { InputHintComponent } from './hint.component';

jest.mock('@angular/core');
jest.mock('@angular/common');
jest.mock('../../icon');
jest.mock('../definitions');

describe('InputHintComponent', () => {
  let instance;

  beforeEach(() => {
    instance = new InputHintComponent();
  });

  it('instance should be an instanceof InputHintComponent', () => {
    expect(instance instanceof InputHintComponent).toBeTruthy();
  });

});