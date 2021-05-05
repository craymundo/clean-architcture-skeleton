import { interval,Observable, timer, zip } from 'rxjs';
import { filter, map, repeat } from 'rxjs/operators';

import { environment } from '../core/environments/environment';
import {
  deepEqualObjects,
  sumarMinutos,
} from '../utils/functions';

export function throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
  if (parentModule) {
    throw new Error(
      `${moduleName} has already been loaded. Import ${moduleName} in the AppModule only.`
    );
  }
}

export function timerSubs$(httpRequest$, ms = 30000): Observable<unknown> {
  const tick$ = timer(ms);
  let firstTime = 0;
  let response;

  return zip(httpRequest$, tick$).pipe(
    repeat(),
    map(([httpResult]) => {
      if (firstTime === 0) {
        response = httpResult;
        firstTime++;
      }
      return httpResult;
    }),
    filter((httpResult) => {
      if (deepEqualObjects(httpResult, response)) {
        return false;
      }
      response = httpResult;
      return true;
    })
  );
}
