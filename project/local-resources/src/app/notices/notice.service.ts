import { Notice } from './notice.model';
import { EventEmitter,Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractDataServiceFromHttp } from '../listable/abstract-data-service-from-http';

import { MOCKITEMS } from './MOCKITEMS';

@Injectable({
  providedIn: 'root'
})

export class NoticeService extends AbstractDataServiceFromHttp<Notice> {
  constructor(http: HttpClient) {
    
    super(http,'http://localhost:3000/notices');    
    http.get<{ message: string; data: Notice[] }>('http://localhost:3000/notices').subscribe(response => {
      console.log(response.message);
      this.setItems(response.data);
    });
  }

  
}

