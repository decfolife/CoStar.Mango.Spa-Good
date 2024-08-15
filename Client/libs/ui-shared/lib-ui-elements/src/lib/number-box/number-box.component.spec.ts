import { NumberBoxComponent } from './number-box.component';

jest.mock('@angular/core');
jest.mock('devextreme-angular');
jest.mock('@angular/common');
jest.mock('devextreme-angular/ui/validator');
jest.mock('devextreme-angular/ui/number-box');

describe('NumberBoxComponent', () => {
  let instance;

  beforeEach(() => {
    instance = new NumberBoxComponent();
  });

  it('instance should be an instanceof NumberBoxComponent', () => {
    expect(instance instanceof NumberBoxComponent).toBeTruthy();
  });

});