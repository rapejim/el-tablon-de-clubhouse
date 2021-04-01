import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  readonly iframeUrlBase = 'https://api.tablon.club/ui/#!/';
  iframeSafeUrl: SafeUrl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    const chartId = this.activatedRoute.snapshot.paramMap.get('chartId');
    switch (chartId) {
      case '0':
      case '1':
        this.iframeSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeUrlBase + chartId);
        break;
      default:
        this.router.navigate(['/404']).then();
        break;
    }
  }

}
