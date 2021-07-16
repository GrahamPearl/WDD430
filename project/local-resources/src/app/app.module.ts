import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GoogleMapsModule } from '@angular/google-maps'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './shared/dropdown.directive';
import { DndModule } from 'ng2-dnd';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NoticesComponent } from './notices/notices.component';
import { ResourcesComponent } from './resources/resources.component';
import { GeotagsComponent } from './geotags/geotags.component';
import { VideosComponent } from './videos/videos.component';
import { FooterComponent } from './footer.component';

import { ContactsListComponent } from './contacts/contacts-list/contacts-list.component';
import { ContactsEditComponent } from './contacts/contacts-edit/contacts-edit.component';
import { ContactsItemComponent } from './contacts/contacts-item/contacts-item.component';
import { ContactsDetailsComponent } from './contacts/contacts-details/contacts-details.component';
import { ContactsFilterPipe } from './contacts/contacts-filter.pipe';

import { HomeComponent } from './home/home.component';
import { MapsComponent } from './maps/maps.component';
import { NoticesListComponent } from './notices/notices-list/notices-list.component';
import { NoticesDetailsComponent } from './notices/notices-details/notices-details.component';
import { NoticesEditComponent } from './notices/notices-edit/notices-edit.component';
import { NoticesItemComponent } from './notices/notices-item/notices-item.component';
import { SignupComponent } from './signup/signup.component';

import { VideosDetailsComponent } from './videos/videos-details/videos-details.component';
import { VideosEditComponent } from './videos/videos-edit/videos-edit.component';
import { VideosItemComponent } from './videos/videos-item/videos-item.component';
import { VideosListComponent } from './videos/videos-list/videos-list.component';


@NgModule({
  declarations: [
    AppComponent,
    DropdownDirective,
    HeaderComponent,
    ContactsComponent,
    NoticesComponent,
    ResourcesComponent,
    GeotagsComponent,
    VideosComponent,
    FooterComponent,

    ContactsListComponent,
    ContactsEditComponent,
    ContactsItemComponent,
    ContactsDetailsComponent,
    
    VideosDetailsComponent,
    VideosEditComponent,
    VideosItemComponent,
    VideosListComponent,
    ContactsFilterPipe,
    MapsComponent,
    HomeComponent,
    SignupComponent,
    NoticesListComponent,
    NoticesDetailsComponent,
    NoticesEditComponent,
    NoticesItemComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,     
    DndModule.forRoot(),
    GoogleMapsModule,   
    FormsModule,    
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
