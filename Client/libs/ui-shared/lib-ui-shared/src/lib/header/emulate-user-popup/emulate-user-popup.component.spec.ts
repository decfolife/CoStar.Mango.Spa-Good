import { Component, OnInit} from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { EmulateUserPopupComponent } from './emulate-user-popup.component';

jest.mock('@angular/core');
jest.mock('@angular/material/dialog');

describe('EmulateUserPopupComponent', () => {
  let instance;

  beforeEach(() => {
    const matDialogRef = {} as MatDialogRef<EmulateUserPopupComponent>;
    instance = new EmulateUserPopupComponent(matDialogRef);
  });

  it('instance should be an instanceof EmulateUserPopupComponent', () => {
    expect(instance instanceof EmulateUserPopupComponent).toBeTruthy();
  });

});