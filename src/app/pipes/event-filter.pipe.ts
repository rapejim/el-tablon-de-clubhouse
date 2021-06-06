import { Pipe, PipeTransform } from '@angular/core';
import {EventItem} from '../common/interfaces';

@Pipe({
  name: 'eventFilter'
})
export class EventFilterPipe implements PipeTransform {

  transform(eventList: EventItem[], text: string): EventItem[] {
    if (!text) { return eventList; }
    return eventList.filter( event => event.title.toLowerCase().includes(text.toLowerCase()) );
  }

}
