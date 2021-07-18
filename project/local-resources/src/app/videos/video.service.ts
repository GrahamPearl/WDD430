import { EventEmitter,Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractDataServiceFromHttp } from '../listable/abstract-data-service-from-http';

import { Video } from './video.model';
import { MOCKITEMS } from './MOCKITEMS';

@Injectable({
  providedIn: 'root'
})
export class VideoService extends AbstractDataServiceFromHttp<Video> {

  constructor(http: HttpClient) {    
    super(http,'http://localhost:3000/videos');    
    http.get<{ message: string; data: Video[] }>('http://localhost:3000/videos').subscribe(response => {
      console.log(response.message);
      this.setItems(response.data);
    });
  }
}
