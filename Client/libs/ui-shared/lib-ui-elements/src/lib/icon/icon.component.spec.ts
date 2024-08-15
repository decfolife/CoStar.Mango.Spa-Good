import { IconComponent } from './icon.component';

jest.mock('@angular/core');
jest.mock('@fortawesome/angular-fontawesome');
jest.mock('@fortawesome/fontawesome-svg-core');
jest.mock('@fortawesome/free-solid-svg-icons');
jest.mock('./definitions/fontAwesome');

describe('IconComponent', () => {
  let instance;

  beforeEach(() => {
    instance = new IconComponent();
  });

  it('instance should be an instanceof IconComponent', () => {
    expect(instance instanceof IconComponent).toBeTruthy();
  });

});