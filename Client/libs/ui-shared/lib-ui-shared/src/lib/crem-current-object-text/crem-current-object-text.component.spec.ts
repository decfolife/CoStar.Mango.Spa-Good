import { CremCurrentObjectTextComponent } from './crem-current-object-text.component';

jest.mock('@angular/core');

describe('CremHeaderComponent', () => {
  let instance;

  beforeEach(() => {
    instance = new CremCurrentObjectTextComponent();
  });

  it('instance should be an instanceof CremHeaderComponent', () => {
    expect(instance instanceof CremCurrentObjectTextComponent).toBeTruthy();
  });

});