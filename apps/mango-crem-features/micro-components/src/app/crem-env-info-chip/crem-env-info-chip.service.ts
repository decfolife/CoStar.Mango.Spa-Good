import { Injectable } from '@angular/core';

@Injectable()
export class CremEnvChipService {

  getEnvironment() {
    let env = sessionStorage.getItem('currentEnvClient');
    return env;
  }
  getDbRestore(){
    let restores = sessionStorage.getItem('dbRestore');
    let transformed: string[] = this.transform(restores);

    return transformed;
  }
  transform(value: string) {
  var restore:string[] = value.split('&#10;');
  //console.log(restore);
  return restore;
}
}
