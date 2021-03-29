import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  readonly iframeUrlBase = 'https://charts.rapejim.es/#!/';
  iframeSafeUrl: SafeUrl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer) {
    const chartId = this.activatedRoute.snapshot.paramMap.get('chartId');
    switch (chartId) {
      case '0':
      case '1':
        this.iframeSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeUrlBase + chartId);
        break;
      default:
        router.navigate(['/404']).then();
        break;
    }
  }

  ngOnInit(): void {
  }

}
