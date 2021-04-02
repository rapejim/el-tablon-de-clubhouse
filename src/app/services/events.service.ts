import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, retry, timeout} from 'rxjs/operators';
import Tools from '../common/tools';
import {Observable, throwError} from 'rxjs';
import {EventItem, SelectParams, SortParam} from '../common/interfaces';
import {GlobalConstants} from '../common/global-constants';
import * as util from 'util';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(
    private httpClient: HttpClient,
  ) {  }

  getOneEvent( recId: string, params?: SelectParams): Observable<EventItem>{
    const url = util.format(GlobalConstants.clubroomsEndpoints.oneEvent, recId) + Tools.selectParamsToQueryString(params);
    return this.httpClient.get(url).pipe(
      timeout(3000),
      retry(0),
      map((res: any) => {
        const event: EventItem = { ...res.fields } as EventItem;
        event.datetimeUTC = new Date(event.datetimeUTC.toString());
        return event;
      }),
      catchError(this.handleError)
    );
  }

  getAllEvents( params?: SelectParams): Observable<EventItem[]>{
    const sortParam: SortParam[] = [
      {field: 'status', direction: 'desc'},
      {field: 'datetimeUTC', direction: 'asc'}
      ];
    params ? params.sort = sortParam : params = { sort: sortParam };
    const url = GlobalConstants.clubroomsEndpoints.allEvents + Tools.selectParamsToQueryString(params);
    return this.httpClient.get(url).pipe(
      timeout(3000),
      retry(0),
      map((res: any[]) => {
        const eventList: EventItem[] = [];
        res.forEach( (item: any) => {
          item.fields.ownerNameList = item.fields.ownerNameList.split(', ');
          item.fields.ownerPicUrlList = item.fields.ownerPicUrlList.split(', ');
          item.fields.datetimeUTC = new Date(item.fields.datetimeUTC);
          item.fields.addedDatetime = new Date(item.fields.addedDatetime);
          const event: EventItem = { ...item.fields } as EventItem;
          eventList.push(event);
        });
        return eventList;
      }),
      catchError(this.handleError)
    );
  }

  getAllEventsProgrammedWithClub(): Observable<EventItem[]>{
    return this.getAllEvents({view: 'EventsProgrammedWithClub'});
  }

  getAllEventsProgrammedWithoutClub(): Observable<EventItem[]>{
    return this.getAllEvents({view: 'EventsProgrammedWithoutClub'});
  }

  handleError(err: any) {
    // console.error('Error buscando eventos: ', err);
    return throwError({code: err.status});
  }

}
