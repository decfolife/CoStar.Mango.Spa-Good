import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { DBkeys } from '../utilities/db-keys';

// This service should ONLY be used when running in LOCALHOST
// Otherwise, we automatically use an authentication cookie with every request we send
@Injectable()
export class JwtService {
  constructor(
    private _storageService: StorageService,
  ) {}

  getToken(): string {
    return this._storageService.getDataObject(DBkeys.JWT_TOKEN);
  }

  saveToken(token: string) {
    this._storageService.savePermanentData(token, DBkeys.JWT_TOKEN);
  }

  destroyToken() {
    this._storageService.deleteData(DBkeys.JWT_TOKEN);
  }
}
