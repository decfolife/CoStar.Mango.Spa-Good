import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BreadCrumb } from '@mango/data-models/lib-data-models'
import { DisplayBreadcrumbsComponent } from './display-breadcrumbs.component';

jest.mock('@angular/core');
jest.mock('@mango/data-models/lib-data-models');

describe('DisplayBreadcrumbsComponent', () => {
  let instance;

  beforeEach(() => {
    instance = new DisplayBreadcrumbsComponent();
  });

  it('instance should be an instanceof DisplayBreadcrumbsComponent', () => {
    expect(instance instanceof DisplayBreadcrumbsComponent).toBeTruthy();
  });

});