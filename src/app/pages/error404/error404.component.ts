import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {GlobalConstants} from '../../common/global-constants';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {

  private readonly title = 'Not Found';

  constructor(
    private router: Router,
    private titleService: Title,
    ) {
    this.setDocTitle(this.title);
  }

  ngOnInit(): void {
  }

  private setDocTitle(title: string){
    this.titleService.setTitle(GlobalConstants.titleBase + ' - ' + title);
  }

  goHome() {
    this.router.navigate(['/']).then();
  }

}
