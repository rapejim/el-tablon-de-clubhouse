import { Component, OnInit } from '@angular/core';
import {ClubItem, EventItem} from '../../common/interfaces';
import {finalize} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {ClubsService} from '../../services/clubs.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss']
})
export class ClubComponent implements OnInit {

  // @ts-ignore
  localeOptions: Intl.DateTimeFormatOptions = { dateStyle: `full`, timeStyle: 'long' };
  club: ClubItem;
  eventList: EventItem[] = [];
  loading = {
    oneClub: false
  };

  constructor(
    private route: ActivatedRoute,
    private clubsService: ClubsService,
    ) { }

  ngOnInit(): void {
    this.getOneClub();
  }

  private getOneClub(){
    this.loading.oneClub = true;
    const urlId = this.route.snapshot.paramMap.get('urlId');
    if (urlId){
      this.clubsService.getOneClub(urlId).pipe(
        finalize( () => {
          this.loading.oneClub = false;
        })
      ).subscribe( (response) => {
        this.club = response;
        console.debug('Clubs searched:', this.club);
      });
    } else {
      setInterval( () => {
        this.loading.oneClub = false;
      }, 400);
    }
  }
}
