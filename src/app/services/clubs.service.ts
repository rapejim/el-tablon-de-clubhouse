import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import Tools from '../common/tools';
import {Observable} from 'rxjs';
import {ClubItem, SelectParams} from '../common/interfaces';
import {GlobalConstants} from '../common/global-constants';
import * as util from 'util';

@Injectable({
  providedIn: 'root'
})

export class ClubsService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getOneClubs( recId: string, params?: SelectParams): Observable<ClubItem>{
    const url = util.format(GlobalConstants.clubroomsEndpoints.oneClub, recId) + Tools.selectParamsToQueryString(params);
    return this.httpClient.get(url).pipe(
      map((res: any) => {
        return { ...res.fields } as ClubItem;
      }));
  }

  getAllClubs( params?: SelectParams): Observable<ClubItem[]>{
    const url = GlobalConstants.clubroomsEndpoints.allClubs + Tools.selectParamsToQueryString(params);
    return this.httpClient.get(url).pipe(
      map((res: any[]) => {
        const clubList: ClubItem[] = [];
        res.forEach( (item: any) => {
          clubList.push( { ...item.fields } as ClubItem);
        });
        return clubList;
      }));
  }

  getAllClubsWithProgrammedEvents(){
    return this.getAllClubs({view: 'ClubsWithEvents'});
  }

}
