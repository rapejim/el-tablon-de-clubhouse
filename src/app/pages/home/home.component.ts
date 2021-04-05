import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {GlobalConstants} from '../../common/global-constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private readonly title = 'Inicio';

  constructor(
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
