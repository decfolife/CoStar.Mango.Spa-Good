import { RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  root: {
    data: any;
    params: any;
    queryParams: any;
  };
}

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    //Get the url this way because if we try to read it directly like we do with the other fields
    //an error is thrown because the url is in segments.
    const { url } = routerState;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return {
      url,
      root: {
        data: route.data,
        params: route.params,
        queryParams: route.queryParams,
      },
    };
  }
}
