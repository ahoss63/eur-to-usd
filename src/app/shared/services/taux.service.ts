import { Injectable } from '@angular/core';
import { Observable, interval, map, shareReplay, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TauxService {
  getTaux(tauxInitial: number, delayMilliSeconds: number): Observable<number> {
    return interval(delayMilliSeconds).pipe(
      map(() => {
        return tauxInitial + (Math.random() - 0.5);
      }),
      startWith(tauxInitial),
      shareReplay()
    );
  }
}
