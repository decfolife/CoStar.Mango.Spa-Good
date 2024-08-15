import { SkeletonComponent } from './skeleton.component';

jest.mock('@angular/core');

describe('SkeletonComponent', () => {
  let instance;

  beforeEach(() => {
    instance = new SkeletonComponent();
  });

  it('instance should be an instanceof SkeletonComponent', () => {
    expect(instance instanceof SkeletonComponent).toBeTruthy();
  });

});