import {SortDirection} from './types';

export interface ClubItem {
  id: string;
  name: string;
  description?: string;
  logoUrl: string;
  profileUrl: string;
  eventIdList?: string[];
  eventProgrammedList?: string[];
  eventProgrammedNameList?: string[];
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
  datetimeUTC: Date;
  status: string;
  profileUrl: string;
}

export class UserItem {
  id: string;
  name: string;
  username: string;
  bio: string;
  picture: string;
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
