import { Component, OnInit } from '@angular/core';
import { CremHeaderComponent } from './crem-header.component';

jest.mock('@angular/core');

describe('CremHeaderComponent', () => {
  let instance;

  beforeEach(() => {
    instance = new CremHeaderComponent();
  });

  it('instance should be an instanceof CremHeaderComponent', () => {
    expect(instance instanceof CremHeaderComponent).toBeTruthy();
  });

});