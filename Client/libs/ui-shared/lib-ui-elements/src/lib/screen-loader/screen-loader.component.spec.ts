import { ScreenLoaderComponent } from './screen-loader.component';

jest.mock('@angular/core');

describe('ScreenLoaderComponent', () => {
  let instance;

  beforeEach(() => {
    instance = new ScreenLoaderComponent();
  });

  it('instance should be an instanceof ScreenLoaderComponent', () => {
    expect(instance instanceof ScreenLoaderComponent).toBeTruthy();
  });

});