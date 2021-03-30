import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, retry, timeout} from 'rxjs/operators';
import Tools from '../common/tools';
import {Observable, throwError} from 'rxjs';
import {ClubItem, SelectParams, SortParam} from '../common/interfaces';
import {GlobalConstants} from '../common/global-constants';
import * as util from 'util';

@Injectable({
  providedIn: 'root'
})

export class ClubsService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getOneClubByRecId(recId: string, params?: SelectParams): Observable<ClubItem>{
    const url = util.format(GlobalConstants.clubroomsEndpoints.oneClub, recId) + Tools.selectParamsToQueryString(params);
    return this.httpClient.get(url).pipe(
      timeout(3000),
      retry(0),
      map((res: any) => {
        const datetimeList: Date[] = [];
        res.fields.eventProgrammedDatetimeList.forEach( item => {
          const newDatetime = new Date(item);
          datetimeList.push(newDatetime);
        });
        res.fields.eventProgrammedDatetimeList = datetimeList;
        res.fields.addedDatetime = new Date(res.fields.addedDatetime);
        res.fields.updatedDatetime = new Date(res.fields.updatedDatetime);
        return { ...res.fields } as ClubItem;
      }),
      catchError(this.handleError)
      );
  }

  getAllClubs(params?: SelectParams): Observable<ClubItem[]>{
    const sortParam: SortParam[] = [
      {field: 'eventProgrammedQty', direction: 'desc'}
    ];
    params ? params.sort = sortParam : params = { sort: sortParam };
    const url = GlobalConstants.clubroomsEndpoints.allClubs + Tools.selectParamsToQueryString(params);
    return this.httpClient.get(url).pipe(
      timeout(3000),
      retry(0),
      map((res: any[]) => {
        const clubList: ClubItem[] = [];
        res.forEach( (item: any) => {
          const datetimeList: Date[] = [];
          item.fields.eventProgrammedDatetimeList?.forEach( date => {
            const newDatetime = new Date(date);
            datetimeList.push(newDatetime);
          });
          item.fields.eventProgrammedDatetimeList = datetimeList;
          item.fields.addedDatetime = new Date(item.fields.addedDatetime);
          item.fields.updatedDatetime = new Date(item.fields.updatedDatetime);
          clubList.push( { ...item.fields } as ClubItem);
        });
        return clubList;
      }),
      catchError(this.handleError)
    );
  }

  getAllClubsWithProgrammedEvents(params?: SelectParams): Observable<ClubItem[]>{
    params ? params.view = 'ClubsWithEvents' : params = { view: 'ClubsWithEvents' };
    return this.getAllClubs(params);
  }

  getOneClubByUrlId(urlId: string, params?: SelectParams): Observable<ClubItem>{
    const filterString = util.format('REGEX_MATCH({urlId}, \'^%s$\') >= 1', urlId);

    params ? params.filterByFormula = filterString : params = { filterByFormula: filterString };
    return this.getAllClubs(params).pipe(
      map((res: any[]) => res[0]));
  }

  handleError(err: any) {
    // console.error('Error buscando clubs: ', err);
    return throwError({code: err.status});
  }

}
