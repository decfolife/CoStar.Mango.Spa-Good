import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { DBkeys } from '../utilities/db-keys';

@Injectable()
export class JwtService {
  constructor(
    private _storageService: StorageService,
  ) {}

  getToken(): String {
    return this._storageService.getDataObject(DBkeys.JWT_TOKEN);
  }

  saveToken(token: String) {
    this._storageService.saveSyncedSessionData(token, DBkeys.JWT_TOKEN);
  }

  destroyToken() {
    this._storageService.deleteData(DBkeys.JWT_TOKEN);
  }
}
