import { Component, OnInit } from '@angular/core';
import {ClubsService} from '../../services/clubs.service';
import {ClubItem} from '../../common/interfaces';
import {debounceTime, finalize} from 'rxjs/operators';
import {ClubsPageState} from '../../common/types';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {GlobalConstants} from '../../common/global-constants';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.scss']
})
export class ClubsComponent implements OnInit {

  private readonly title = 'Clubs';
  readonly EVENTS_TO_SHOW = 2;
  pageState: ClubsPageState = 'empty';
  clubList: ClubItem[] = [];
  loading = {
    all: false,
    wEvents: false,
    oneClub: false
  };

  filterInput: FormControl = new FormControl('');
  filterText: string;

  constructor(
    private clubsService: ClubsService,
    private router: Router,
    private titleService: Title,
    ) {
    this.setDocTitle(this.title);
  }

  ngOnInit(): void {
    this.getAllClubsWithProgrammedEvents();
    this.filterInput.valueChanges.pipe(
      debounceTime(300)
    ).subscribe( value => this.filterText = value);
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
    }, err => {
      console.error('Error buscando los Clubs.');
      if (err.code === 404){
        this.router.navigate(['/404']).then();
      }
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
    }, err => {
      console.error('Error buscando los Clubs con eventos programados.');
      if (err.code === 404){
        this.router.navigate(['/404']).then();
      }
    });
  }

  clearClubList() {
    this.clubList = [];
    this.pageState = 'empty';
  }

  private setDocTitle(title: string){
    this.titleService.setTitle(GlobalConstants.titleBase + ' - ' + title);
  }
}
