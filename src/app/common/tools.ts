import {SelectParams, SortParam} from './interfaces';

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
        switch (item[0]) {
          case 'fields':
            const fieldsArray: string[] = item[1];
            fieldsArray.forEach( (subItem, j) => {
              result += item[0] + '[]=' + item[1];
              if (j < fieldsArray.length - 1) { result += '&'; }
            });
            break;

          case 'filterByFormula':
          case 'maxRecords':
          case 'pageSize':
          case 'view':
            result += item[0] + '=' + item[1];
            break;

          case 'sort':
            const sortParams: SortParam[] = item[1];
            sortParams.forEach( (subItem, j) => {
              result += item[0] + '[' + j + '][direction]=' + subItem.direction;
              result += '&' + item[0] + '[' + j + '][field]=' + subItem.field;
              if (j < sortParams.length - 1) { result += '&'; }
            });
            break;
        }
        result = encodeURI(result);
      });
    }
    return result;
  }

  static getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

}
