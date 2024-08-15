import { LoaderComponent } from './loader.component';

jest.mock('@angular/core');

describe('LoaderComponent', () => {
  let instance;

  beforeEach(() => {
    instance = new LoaderComponent();
  });

  it('instance should be an instanceof LoaderComponent', () => {
    expect(instance instanceof LoaderComponent).toBeTruthy();
  });
});