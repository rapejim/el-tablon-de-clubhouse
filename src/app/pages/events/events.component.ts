import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../services/events.service';
import {finalize} from 'rxjs/operators';
import {EventItem} from '../../common/interfaces';
import {EventsPageState} from '../../common/types';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  // @ts-ignore
  localeOptions: Intl.DateTimeFormatOptions = { dateStyle: `full`, timeStyle: 'long' };
  pageState: EventsPageState = 'empty';
  eventList: EventItem[] = [];
  loading = {
    withoutClub: false,
    withClub: false,
    oneEvent: false
  };

  constructor(
    private eventsService: EventsService,
  ) { }

  ngOnInit(): void {
    this.getAllEventsProgrammedWithoutClub();
  }

  getAllEventsProgrammedWithClub(){
    this.loading.withClub = true;
    this.eventsService.getAllEventsProgrammedWithClub().pipe(
      finalize( () => {
        this.loading.withClub = false;
        this.pageState = 'withClub';
      })
    ).subscribe( (data) => {
      this.eventList = data;
      console.debug('Events with Club:', this.eventList);
    });
  }

  getAllEventsProgrammedWithoutClub(){
    this.loading.withoutClub = true;
    this.eventsService.getAllEventsProgrammedWithoutClub().pipe(
      finalize( () => {
        this.loading.withoutClub = false;
        this.pageState = 'withoutClub';
      })
    ).subscribe( (data) => {
      this.eventList = data;
      console.debug('Events without Club:', this.eventList);
    });
  }

  clearEventList() {
    this.eventList = [];
    this.pageState = 'empty';
  }

}
