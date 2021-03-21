import {SelectParams} from './interfaces';

export default class Tools {

  static selectParamsToQueryString(params: SelectParams) {
    let result = '';
    if (params){
      const paramsEntries = Object.entries(params);
      paramsEntries.forEach( (item, i) => {
        if (i === 0) {
          result = '?';
        } else {
          result += '&';
        }
        result += item[0] + '=' + item[1];
      });
    }
    return result;
  }

  static getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

}
