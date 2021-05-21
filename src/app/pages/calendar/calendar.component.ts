import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeUrl, Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {GlobalConstants} from '../../common/global-constants';
import {filter} from 'rxjs/operators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  private readonly title = 'Calendario';

  private routerChangesSubscription: Subscription;
  readonly iframeUrlBase = 'https://airtable.com/embed/';
  private iframeId = '';
  readonly queryParams = '?mode=week';
  iframeSafeUrl: SafeUrl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private titleService: Title,
  ) {
    this.setDocTitle(this.title);
    this.routerChangesSubscription = this.router.events
      .pipe( filter(resp => resp instanceof NavigationEnd) )
      .subscribe (() => {
        this.iframeId = this.activatedRoute.snapshot.paramMap.get('calendarId');
        this.loadCalendar(this.iframeUrlBase + this.iframeId + this.queryParams);
      });
  }

  ngOnInit(): void {
  }

  loadCalendar(iframeUrl){
    this.iframeSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(iframeUrl);
  }

  private setDocTitle(title: string){
    this.titleService.setTitle(GlobalConstants.titleBase + ' - ' + title);
  }

}
