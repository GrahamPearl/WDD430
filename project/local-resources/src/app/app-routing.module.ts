import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { NoticesComponent } from './notices/notices.component';
import { NoticesDetailsComponent } from './notices/notices-details/notices-details.component';
import { NoticesEditComponent } from './notices/notices-edit/notices-edit.component';

import { VideosComponent } from './videos/videos.component';
import { VideosDetailsComponent } from './videos/videos-details/videos-details.component';
import { VideosEditComponent } from './videos/videos-edit/videos-edit.component';

import { ResourcesComponent } from './resources/resources.component';
import { ResourcesDetailsComponent } from './resources/resources-details/resources-details.component';
import { ResourcesEditComponent } from './resources/resources-edit/resources-edit.component';

import { MapsComponent } from './maps/maps.component';

import { ContactsComponent } from './contacts/contacts.component';
import { ContactsDetailsComponent } from './contacts/contacts-details/contacts-details.component';
import { ContactsEditComponent } from './contacts/contacts-edit/contacts-edit.component';


const routes: Routes = [];
const appRoutes: Routes = [
  { path: '', component: HomeComponent },  
  { path: 'signup', component: SignupComponent }, 
  {
    path: 'notices', component: NoticesComponent,    
    children: [
      { path: 'new', component: NoticesEditComponent },
      { path: ':id', component: NoticesDetailsComponent },
      { path: ':id/edit', component: NoticesEditComponent },
    ],
  },
  {
    path: 'resources', component: ResourcesComponent,
    children: [
      { path: 'new', component: ResourcesEditComponent },
      { path: ':id', component: ResourcesDetailsComponent },
      { path: ':id/edit', component: ResourcesEditComponent },
    ],
  },
  {
    path: 'maps', component: MapsComponent,    
  },
  {
    path: 'videos', component: VideosComponent,
    children: [
      { path: 'new', component: VideosEditComponent },
      { path: ':id', component: VideosDetailsComponent },
      { path: ':id/new', component: VideosEditComponent },
      { path: ':id/edit', component: VideosEditComponent },
    ],
  },
  {
    path: 'contacts', component: ContactsComponent,
    children: [
      { path: 'new', component: ContactsEditComponent },
      { path: ':id', component: ContactsDetailsComponent },
      { path: ':id/edit', component: ContactsEditComponent },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
