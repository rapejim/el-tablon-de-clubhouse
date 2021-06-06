import { Pipe, PipeTransform } from '@angular/core';
import {ClubItem} from '../common/interfaces';

@Pipe({
  name: 'clubFilter'
})
export class ClubFilterPipe implements PipeTransform {

  transform(clubList: ClubItem[], text: string): ClubItem[] {
    if (!text) { return clubList; }
    return clubList.filter( club => club.name.toLowerCase().includes(text.toLowerCase()) );
  }

}
