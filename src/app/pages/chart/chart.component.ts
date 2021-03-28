import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  readonly iframeUrl = 'https://charts.rapejim.es/#!/1';
  iframeSafeUrl: SafeUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.iframeSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.iframeUrl);
  }

  ngOnInit(): void {
  }

}
