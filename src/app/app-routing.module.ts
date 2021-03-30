import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {ClubsComponent} from './pages/clubs/clubs.component';
import {ClubComponent} from './pages/club/club.component';
import {EventsComponent} from './pages/events/events.component';
import {EventComponent} from './pages/event/event.component';
import {ChartComponent} from './pages/chart/chart.component';
import {ContactComponent} from './pages/contact/contact.component';
import {Error404Component} from './pages/error404/error404.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'clubs', component: ClubsComponent },
  { path: 'club/:urlId', component: ClubComponent },
  { path: 'events', component: EventsComponent },
  { path: 'event/:urlId', component: EventComponent },
  { path: 'chart/:chartId', component: ChartComponent },
  { path: 'contact', component: ContactComponent },
  { path: '404', component: Error404Component },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
