import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable, of } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { } from '@ws-widget/collection'
import { IResolveResponse } from '@ws-widget/utils'
import { CompetenceService } from '../services/competence.service'

@Injectable()
export class ProfileResolve
  implements
  Resolve<Observable<IResolveResponse<any>> | IResolveResponse<any>> {
  constructor(private competenceSvc: CompetenceService) { }

  resolve(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Observable<IResolveResponse<any>> {
    return this.competenceSvc.fetchProfile().pipe(
      map(data => ({ data, error: null })),
      catchError(error => of({ error, data: null })),
    )
  }
}
