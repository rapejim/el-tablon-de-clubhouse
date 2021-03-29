import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import Tools from '../common/tools';
import {Observable} from 'rxjs';
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

  getOneClub(recId: string, params?: SelectParams): Observable<ClubItem>{
    const url = util.format(GlobalConstants.clubroomsEndpoints.oneClub, recId) + Tools.selectParamsToQueryString(params);
    return this.httpClient.get(url).pipe(
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
      }));
  }

  getAllClubs(params?: SelectParams): Observable<ClubItem[]>{
    const sortParam: SortParam[] = [
      {field: 'eventProgrammedQty', direction: 'desc'}
    ];
    params ? params.sort = sortParam : params = { sort: sortParam };
    const url = GlobalConstants.clubroomsEndpoints.allClubs + Tools.selectParamsToQueryString(params);
    return this.httpClient.get(url).pipe(
      map((res: any[]) => {
        const clubList: ClubItem[] = [];
        res.forEach( (item: any) => {
          item.fields.addedDatetime = new Date(item.fields.addedDatetime);
          item.fields.updatedDatetime = new Date(item.fields.updatedDatetime);
          clubList.push( { ...item.fields } as ClubItem);
        });
        return clubList;
      }));
  }

  getAllClubsWithProgrammedEvents(params?: SelectParams): Observable<ClubItem[]>{
    params ? params.view = 'ClubsWithEvents' : params = { view: 'ClubsWithEvents' };
    return this.getAllClubs(params);
  }

}
