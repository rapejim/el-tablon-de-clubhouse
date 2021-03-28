import { Component, OnInit } from '@angular/core';
import {ClubsService} from '../../services/clubs.service';
import {ClubItem} from '../../common/interfaces';
import {finalize} from 'rxjs/operators';
import {PageState} from '../../common/types';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.scss']
})
export class ClubsComponent implements OnInit {

  readonly EVENTS_TO_SHOW = 2;
  pageState: PageState = 'empty';
  clubList: ClubItem[] = [];
  loading = {
    all: false,
    wEvents: false,
    oneClub: false
  };

  constructor(
    private clubsService: ClubsService,
    ) { }

  ngOnInit(): void {
    this.getAllClubsWithProgrammedEvents();
  }

  getAllClubs(){
    this.loading.all = true;
    this.clubsService.getAllClubs().pipe(
      finalize( () => {
        this.loading.all = false;
        this.pageState = 'all';
      })
    ).subscribe( (data) => {
      this.clubList = data;
      console.debug('All clubs:', this.clubList);
    });
  }

  getAllClubsWithProgrammedEvents(){
    this.loading.wEvents = true;
    this.clubsService.getAllClubsWithProgrammedEvents().pipe(
      finalize( () => {
        this.loading.wEvents = false;
        this.pageState = 'programmed';
      })
    ).subscribe( (data) => {
      this.clubList = data;
      console.debug('All clubs with programmed events:', this.clubList);
    });
  }

  clearClubList() {
    this.clubList = [];
    this.pageState = 'empty';
  }
}
