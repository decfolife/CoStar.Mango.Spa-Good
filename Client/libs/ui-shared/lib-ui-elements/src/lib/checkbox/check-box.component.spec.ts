import { CheckBoxComponent } from './check-box.component';

jest.mock('@angular/core');
jest.mock('devextreme-angular');

describe('CheckBoxComponent', () => {
  let instance;

  beforeEach(() => {
    instance = new CheckBoxComponent();
  });

  it('instance should be an instanceof CheckBoxComponent (crem-check-box)', () => {
    expect(instance instanceof CheckBoxComponent).toBeTruthy();
  });

});