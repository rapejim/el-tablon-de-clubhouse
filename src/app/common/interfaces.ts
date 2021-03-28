import {SortDirection} from './types';

export interface ClubItem {
  id: string;
  urlId: string;
  name: string;
  description?: string;
  logoUrl: string;
  profileUrl: string;
  eventIdList?: string[];
  eventProgrammedList?: string[];
  eventProgrammedNameList?: string[];
  eventProgrammedDatetimeList?: Date[];
  addedDatetime: Date;
  updatedDatetime: Date;
}

export class EventItem {
  id: string;
  urlId: string;
  title: string;
  description?: string;
  clubId: string;
  clubName: string;
  ownerIdList: string[];
  ownerNameList: string[];
  ownerNameListAuto: string[];
  ownerPicUrlList: string[];
  ownerPicUrlListAuto: string[];
  datetimeUTC: Date;
  status: string;
  profileUrl: string;
  addedDatetime: Date;
}

export class UserItem {
  id: string;
  name: string;
  username: string;
  bio: string;
  pictureUrl: string;
  eventIdList: string[];
  profileUrl: string;
}

export interface SelectParams {
  fields?: string[];
  filterByFormula?: string;
  maxRecords?: number;
  pageSize?: number;
  sort?: SortParam[];
  view?: string;
}

export interface SortParam {
  field: string;
  direction: SortDirection;
}
