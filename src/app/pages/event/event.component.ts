import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../services/events.service';
import {Title} from '@angular/platform-browser';
import {GlobalConstants} from '../../common/global-constants';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  private readonly title = 'Evento';

  constructor(
    private eventsService: EventsService,
    private titleService: Title,
  ) {
    this.setDocTitle(this.title);
  }

  ngOnInit(): void {
  }


  private setDocTitle(title: string){
    this.titleService.setTitle(GlobalConstants.titleBase + ' - ' + title);
  }

}
