import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { ConfigurationsService, getStringifiedQueryParams } from '../../../../../utils/src/public-api'
import { NsAutoComplete } from './user-autocomplete.model'

// TODO: move this in some common place
const PROTECTED_SLAG_V8 = '/apis/protected/v8'
const API_END_POINTS = {
  AUTOCOMPLETE: `/apis/protected/v8/user/profileRegistry/searchUserRegistry`,
  AUTOCOMPLETE_BY_DEPARTMENT: (query: string) => `${PROTECTED_SLAG_V8}/user/autocomplete/department/${query}`,
}

@Injectable({
  providedIn: 'root',
})
export class UserAutocompleteService {

  constructor(
    private http: HttpClient,
    private configSvc: ConfigurationsService
  ) { }

  fetchAutoComplete(
    query: string,
  ): Observable<NsAutoComplete.IUserAutoComplete[]> {
    let url = API_END_POINTS.AUTOCOMPLETE

    const stringifiedQueryParams = getStringifiedQueryParams({
      dealerCode: this.configSvc.userProfile && this.configSvc.userProfile.dealerCode ? this.configSvc.userProfile.dealerCode : undefined,
      sourceFields: this.configSvc.instanceConfig && this.configSvc.instanceConfig.sourceFieldsUserAutocomplete
        ? this.configSvc.instanceConfig.sourceFieldsUserAutocomplete
        : undefined,
    })

    url += stringifiedQueryParams ? `?${stringifiedQueryParams}` : ''

    return this.http.post<NsAutoComplete.IUserAutoComplete[]>(
      url, {
      filters: {
        personalDetails: {
          firstname: { startsWith: query },
        },
      },

      limit: 50,
      offset: 0,
    }
    )
  }

  fetchAutoCompleteByDept(
    query: string,
    departments: any
  ): Observable<NsAutoComplete.IUserAutoComplete[]> {
    let url = API_END_POINTS.AUTOCOMPLETE_BY_DEPARTMENT(query)

    const stringifiedQueryParams = getStringifiedQueryParams({
      dealerCode: this.configSvc.userProfile && this.configSvc.userProfile.dealerCode ? this.configSvc.userProfile.dealerCode : undefined,
      sourceFields: this.configSvc.instanceConfig && this.configSvc.instanceConfig.sourceFieldsUserAutocomplete
        ? this.configSvc.instanceConfig.sourceFieldsUserAutocomplete
        : undefined,
    })

    url += stringifiedQueryParams ? `?${stringifiedQueryParams}` : ''

    return this.http.post<NsAutoComplete.IUserAutoComplete[]>(
      url,
      { departments }
    )
  }
}
