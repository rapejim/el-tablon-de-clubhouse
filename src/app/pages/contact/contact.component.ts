import { Component, OnInit } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {GlobalConstants} from '../../common/global-constants';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  private readonly title = 'Contacto';

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
