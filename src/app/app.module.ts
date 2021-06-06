import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { FooterComponent } from './common/footer/footer.component';
import { ClubsComponent } from './pages/clubs/clubs.component';
import { EventsComponent } from './pages/events/events.component';
import { ChartComponent } from './pages/chart/chart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { Error404Component } from './pages/error404/error404.component';
import { HttpClientModule } from '@angular/common/http';
import { ClubComponent } from './pages/club/club.component';
import { EventComponent } from './pages/event/event.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { FaqComponent } from './pages/faq/faq.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClubFilterPipe } from './pipes/club-filter.pipe';
import { EventFilterPipe } from './pipes/event-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ClubsComponent,
    EventsComponent,
    ContactComponent,
    Error404Component,
    ChartComponent,
    ClubComponent,
    EventComponent,
    CalendarComponent,
    FaqComponent,
    ClubFilterPipe,
    EventFilterPipe
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
    ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
