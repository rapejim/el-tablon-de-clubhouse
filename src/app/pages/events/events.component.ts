import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../services/events.service';
import {debounceTime, finalize} from 'rxjs/operators';
import {EventItem} from '../../common/interfaces';
import {EventsPageState} from '../../common/types';
import {Title} from '@angular/platform-browser';
import {GlobalConstants} from '../../common/global-constants';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  private readonly title = 'Eventos';

  // @ts-ignore
  localeOptions: Intl.DateTimeFormatOptions = { dateStyle: 'full', timeStyle: 'long' };
  pageState: EventsPageState = 'empty';
  eventList: EventItem[] = [];
  loading = {
    withoutClub: false,
    withClub: false,
    oneEvent: false
  };

  filterInput: FormControl = new FormControl('');
  filterText: string;

  constructor(
    private eventsService: EventsService,
    private titleService: Title,
  ) {
    this.setDocTitle(this.title);
  }

  ngOnInit(): void {
    this.getAllEventsProgrammedWithoutClub();
    this.filterInput.valueChanges.pipe(
      debounceTime(300)
    ).subscribe( value => this.filterText = value);
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

  private setDocTitle(title: string){
    this.titleService.setTitle(GlobalConstants.titleBase + ' - ' + title);
  }

}
