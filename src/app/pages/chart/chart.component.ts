import {Component, OnDestroy} from '@angular/core';
import {DomSanitizer, SafeUrl, Title} from '@angular/platform-browser';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {GlobalConstants} from '../../common/global-constants';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnDestroy {

  private readonly title = 'Gráfica';

  private routerChangesSubscription: Subscription;
  readonly iframeUrlBase = 'https://api.tablon.club/ui/#!/';
  private chartId = '0';
  iframeSafeUrl: SafeUrl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private titleService: Title,
  ) {
    this.setDocTitle(this.title + ' ' + this.chartId);
    this.routerChangesSubscription = this.router.events
      .pipe( filter(resp => resp instanceof NavigationEnd) )
      .subscribe (() => {
        this.chartId = this.activatedRoute.snapshot.paramMap.get('chartId');
        this.loadChart(this.chartId);
      });
  }

  ngOnDestroy(): void {
    this.routerChangesSubscription.unsubscribe();
  }

  loadChart(id: string){
    switch (id) {
      case '0':
      case '1':
      case '2':
        this.iframeSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeUrlBase + id);
        break;
      default:
        this.router.navigate(['/404']).then();
        break;
    }
  }

  private setDocTitle(title: string){
    this.titleService.setTitle(GlobalConstants.titleBase + ' - ' + title);
  }

}
