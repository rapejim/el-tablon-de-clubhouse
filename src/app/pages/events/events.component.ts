import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../services/events.service';
import {finalize} from 'rxjs/operators';
import Tools from '../../common/tools';
import {EventItem} from '../../common/interfaces';
import {PageState} from '../../common/types';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  // @ts-ignore
  localeOptions: Intl.DateTimeFormatOptions = { dateStyle: `full`, timeStyle: 'long' };
  pageState: PageState = 'empty';
  eventList: EventItem[] = [];
  loading = {
    all: false,
    programmed: false,
    oneEvent: false
  };

  constructor(
    private eventsService: EventsService,
  ) { }

  ngOnInit(): void {
    this.getAllEventsProgrammed();
  }

  getOneEvent(recId: string){
    this.loading.oneEvent = true;
    if (recId){
      this.eventsService.getOneEvent(recId).pipe(
        finalize( () => {
          this.loading.oneEvent = false;
        })
      ).subscribe( (data) => {
        this.eventList.push(data);
        console.debug('Added one events:', this.eventList);
      });
    } else {
      setInterval( () => {
        this.loading.oneEvent = false;
      }, 400);
    }
  }

  getAllEvents(){
    this.loading.all = true;
    this.eventsService.getAllEvents().pipe(
      finalize( () => {
        this.loading.all = false;
        this.pageState = 'all';
      })
    ).subscribe( (data) => {
      this.eventList = data;
      console.debug('All events:', this.eventList);
    });
  }

  getAllEventsProgrammed(){
    this.loading.programmed = true;
    this.eventsService.getAllEventsProgrammed().pipe(
      finalize( () => {
        this.loading.programmed = false;
        this.pageState = 'programmed';
      })
    ).subscribe( (data) => {
      this.eventList = data;
      console.debug('All events programmed:', this.eventList);
    });
  }

  clearEventList() {
    this.eventList = [];
    this.pageState = 'empty';
  }

  getRandomInt(max: number){
    return Tools.getRandomInt(max);
  }

}
