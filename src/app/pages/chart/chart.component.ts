import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  nodeRedUrl = 'https://clubmorning.rapejim.es/#!/0';
  nodeRedSafeUrl: SafeUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.nodeRedSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.nodeRedUrl);
  }

  ngOnInit(): void {
  }

}
