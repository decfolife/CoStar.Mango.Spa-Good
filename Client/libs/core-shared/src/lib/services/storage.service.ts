import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { UtilitiesService } from './utilities.service';

@Injectable()
/**
 * Provides an wrapper for accessing the web storage API and synchronizing session storage across tabs/windows.
 */
export class StorageService {
  public static readonly DBKEY_USER_DATA = 'user_data';
  private static readonly DBKEY_SYNC_KEYS = 'sync_keys';
  
  private syncKeys: string[] = [];
  private initEvent = new Subject();

  private reservedKeys: string[] = [
    'sync_keys',
    'addToSyncKeys',
    'removeFromSyncKeys',
    'getSessionStorage',
    'setSessionStorage',
    'addToSessionStorage',
    'removeFromSessionStorage',
    'clearAllSessionsStorage',
  ];

  // save/update seesion data
  public saveSyncedSessionData(
    data: any,
    key = StorageService.DBKEY_USER_DATA
  ) {
    this.testForInvalidKeys(key);
    // Update session data
    localStorage.removeItem(key);
    this.addToSessionStorage(data, key);
  }

  // save/update key and value
  public savePermanentData(data: any, key = StorageService.DBKEY_USER_DATA) {
    this.testForInvalidKeys(key);

    this.removeFromSessionStorage(key);
    this.localStorageSetItem(key, data);
  }

  public getData(key = StorageService.DBKEY_USER_DATA) {
    this.testForInvalidKeys(key);

    let data = this.sessionStorageGetItem(key);

    if (data == null) {
      data = this.localStorageGetItem(key);
    }

    return data;
  }

  public getDataObject<T>(
    key = StorageService.DBKEY_USER_DATA,
    isDateType = false
  ): T {
    let data = this.getData(key);

    if (data != null) {
      if (isDateType) {
        data = new Date(data);
      }
      return <T>data;
    } else {
      return null;
    }
  }

  public clearAll() {
    localStorage.clear()
    sessionStorage.clear()
    this.syncKeys = []
  }

  public deleteData(key = StorageService.DBKEY_USER_DATA) {
    this.testForInvalidKeys(key);

    this.removeFromSessionStorage(key);
    localStorage.removeItem(key);
  }

  // Get initial event
  public getInitEvent(): Observable<{}> {
    return this.initEvent.asObservable();
  }

  private addToSessionStorage(data: any, key: string) {
    this.addToSessionStorageHelper(data, key);
    this.addToSyncKeysBackup(key);

    this.localStorageSetItem('addToSessionStorage', { key: key, data: data });
    localStorage.removeItem('addToSessionStorage');
  }

  private addToSessionStorageHelper(data: any, key: string) {
    this.addToSyncKeysHelper(key);
    this.sessionStorageSetItem(key, data);
  }

  private removeFromSessionStorage(keyToRemove: string) {
    this.removeFromSessionStorageHelper(keyToRemove);
    this.removeFromSyncKeysBackup(keyToRemove);

    localStorage.setItem('removeFromSessionStorage', keyToRemove);
    localStorage.removeItem('removeFromSessionStorage');
  }

  private removeFromSessionStorageHelper(keyToRemove: string) {
    sessionStorage.removeItem(keyToRemove);
    this.removeFromSyncKeysHelper(keyToRemove);
  }

  // Check if key is valid or not, throw exceptions if not
  private testForInvalidKeys(key: string) {
    if (!key) {
      throw new Error('key cannot be empty');
    }

    // tslint:disable-next-line: triple-equals
    if (this.reservedKeys.some((x) => x == key)) {
      throw new Error(
        `The storage key "${key}" is reserved and cannot be used. Please use a different key`
      );
    }
  }

  private syncKeysContains(key: string) {
    return this.syncKeys.some((x) => x == key);
  }

  // Get sync keys from storage
  private getSyncKeysFromStorage(defaultValue: string[] = []): string[] {
    const data = this.localStorageGetItem(StorageService.DBKEY_SYNC_KEYS);

    if (data == null) {
      return defaultValue;
    } else {
      return <string[]>data;
    }
  }

  // Add key to sync key array
  private addToSyncKeysBackup(key: string) {
    const storedSyncKeys = this.getSyncKeysFromStorage();

    if (!storedSyncKeys.some((x) => x == key)) {
      storedSyncKeys.push(key);
      this.localStorageSetItem(StorageService.DBKEY_SYNC_KEYS, storedSyncKeys);
    }
  }

  // Remove key from sync key array
  private removeFromSyncKeysBackup(key: string) {
    const storedSyncKeys = this.getSyncKeysFromStorage();

    const index = storedSyncKeys.indexOf(key);

    if (index > -1) {
      storedSyncKeys.splice(index, 1);
      this.localStorageSetItem(StorageService.DBKEY_SYNC_KEYS, storedSyncKeys);
    }
  }

  // Add key into sync key array
  private addToSyncKeysHelper(key: string) {
    if (!this.syncKeysContains(key)) {
      this.syncKeys.push(key);
    }
  }

  // Remove key from sync key array
  private removeFromSyncKeysHelper(key: string) {
    const index = this.syncKeys.indexOf(key);

    if (index > -1) {
      this.syncKeys.splice(index, 1);
    }
  }

  private localStorageSetItem(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  private sessionStorageSetItem(key: string, data: any) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  /* Local storeage persist until explicitly deleted
        Session storage is saved only per tab
    */
  private localStorageGetItem(key: string) {
    return UtilitiesService.JsonTryParse(localStorage.getItem(key));
  }

  private sessionStorageGetItem(key: string) {
    return UtilitiesService.JsonTryParse(sessionStorage.getItem(key));
  }
}
