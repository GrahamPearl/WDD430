import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { NoticesComponent } from './notices/notices.component';

import { VideosComponent } from './videos/videos.component';
import { VideosDetailsComponent } from './videos/videos-details/videos-details.component';
import { VideosEditComponent } from './videos/videos-edit/videos-edit.component';
import { ResourcesComponent } from './resources/resources.component';
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
      { path: 'new', component: NoticesComponent },
      { path: ':id', component: NoticesComponent },
      { path: ':id/edit', component: NoticesComponent },
    ],
  },
  {
    path: 'resources', component: ResourcesComponent,
    children: [
      { path: 'new', component: NoticesComponent },
      { path: ':id', component: NoticesComponent },
      { path: ':id/edit', component: NoticesComponent },
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
