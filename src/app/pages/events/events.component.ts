import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../services/events.service';
import {finalize} from 'rxjs/operators';
import Tools from '../../common/tools';
import {EventItem} from '../../common/interfaces';
import * as $ from 'jquery';
// declare var $: any;

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  // @ts-ignore
  localeOptions: Intl.DateTimeFormatOptions = { dateStyle: `full`, timeStyle: 'long' };
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
      })
    ).subscribe( (data) => {
      this.eventList = data;
      console.debug('All events programmed:', this.eventList);
    });
  }

  clearEventList() {
    this.eventList = [];
  }

  getRandomInt(max: number){
    return Tools.getRandomInt(max);
  }

}
