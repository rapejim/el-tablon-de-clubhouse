import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import Tools from '../common/tools';
import {Observable} from 'rxjs';
import {EventItem, SelectParams} from '../common/interfaces';
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
      map((res: any) => {
        const event: EventItem = { ...res.fields } as EventItem;
        event.datetimeUTC = new Date(event.datetimeUTC.toString());
        return event;
      }));
  }

  getAllEvents( params?: SelectParams): Observable<EventItem[]>{
    const url = GlobalConstants.clubroomsEndpoints.allEvents + Tools.selectParamsToQueryString(params);
    return this.httpClient.get(url).pipe(
      map((res: any[]) => {
        const eventList: EventItem[] = [];
        res.forEach( (item: any) => {
          item.fields.ownerNameList = item.fields.ownerNameList.split(', ');
          item.fields.ownerPicUrlList = item.fields.ownerPicUrlList.split(', ');
          item.fields.datetimeUTC = new Date(item.fields.datetimeUTC);
          const event: EventItem = { ...item.fields } as EventItem;
          eventList.push(event);
        });
        return eventList;
      }));
  }

  getAllEventsProgrammed(): Observable<EventItem[]>{
    return this.getAllEvents({view: 'EventsProgrammed'});
  }

}
