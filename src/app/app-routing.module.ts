import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {ChartComponent} from './pages/chart/chart.component';
import {ClubsComponent} from './pages/clubs/clubs.component';
import {ClubComponent} from './pages/club/club.component';
import {ContactComponent} from './pages/contact/contact.component';
import {EventsComponent} from './pages/events/events.component';
import {EventComponent} from './pages/event/event.component';
import {Error404Component} from './pages/error404/error404.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'chart/:chartId', component: ChartComponent },
  { path: 'ch/:chartId', component: ChartComponent },
  { path: 'clubs', component: ClubsComponent },
  { path: 'club/:urlId', component: ClubComponent },
  { path: 'c/:urlId', component: ClubComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'events', component: EventsComponent },
  { path: 'event/:urlId', component: EventComponent },
  { path: 'e/:urlId', component: EventComponent },
  { path: '404', component: Error404Component },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
