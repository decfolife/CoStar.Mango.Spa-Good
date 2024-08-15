import { SearchComponent } from './search.component';

jest.mock('@angular/common');
jest.mock('@angular/core');
jest.mock('rxjs');
jest.mock('rxjs/operators');
jest.mock('../icon');
jest.mock('@angular/material/form-field');
jest.mock('@angular/material/input');
jest.mock('../input');

describe('SearchComponent', () => {
  let instance;

  beforeEach(() => {
    instance = new SearchComponent();
  });

  it('instance should be an instanceof SearchComponent', () => {
    expect(instance instanceof SearchComponent).toBeTruthy();
  });

});