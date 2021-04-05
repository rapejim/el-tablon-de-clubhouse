import { Component, OnInit } from '@angular/core';
import {ClubItem} from '../../common/interfaces';
import {finalize} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {ClubsService} from '../../services/clubs.service';
import {Title} from '@angular/platform-browser';
import {GlobalConstants} from '../../common/global-constants';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss']
})
export class ClubComponent implements OnInit {

  private readonly title = 'Club';
  private readonly recIdRegExp: RegExp = /^rec.{14}/;

  // @ts-ignore
  localeOptions: Intl.DateTimeFormatOptions = { dateStyle: 'full', timeStyle: 'long' };
  club: ClubItem;
  loading = {
    oneClub: false
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private clubsService: ClubsService,
    private titleService: Title,
    ) {
    this.setDocTitle(this.title);
  }

  ngOnInit(): void {
    const urlId = this.activatedRoute.snapshot.paramMap.get('urlId');
    if (this.recIdRegExp.test(urlId)) {
      this.getOneClubByRecId(urlId);
    } else {
      this.getOneClubByUrlId(urlId);
    }
  }

  private getOneClubByRecId(recId: string){
    this.loading.oneClub = true;

    if (recId && this.recIdRegExp.test(recId)){
      this.clubsService.getOneClubByRecId(recId).pipe(
        finalize( () => {
          this.loading.oneClub = false;
        })
      ).subscribe( (response) => {
        this.club = response;
        console.debug('Club searched:', this.club);
      }, err => {
        console.error('No se ha encontrado el Club de esa url (' + recId + ')');
        if (err.code === 404){
          this.router.navigate(['/404']).then();
        }
      });
    } else {
      setInterval( () => {
        this.loading.oneClub = false;
      }, 400);
    }
  }

  private getOneClubByUrlId(urlId: string){
    this.loading.oneClub = true;

    if (urlId && !this.recIdRegExp.test(urlId)){
      this.clubsService.getOneClubByUrlId(urlId).pipe(
        finalize( () => {
          this.loading.oneClub = false;
        })
      ).subscribe( (response) => {
        this.club = response;
        console.debug('Club searched:', this.club);
      }, err => {
        console.error('No se ha encontrado el Club de esa url (' + urlId + ')');
        if (err.code === 404){
          this.router.navigate(['/404']).then();
        }
      });
    } else {
      setInterval( () => {
        this.loading.oneClub = false;
      }, 400);
    }
  }

  private setDocTitle(title: string){
    this.titleService.setTitle(GlobalConstants.titleBase + ' - ' + title);
  }

}
