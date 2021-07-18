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
    //super(http,'https://pearlgwdd430-default-rtdb.firebaseio.com/notices.json');
    super(http,'http://localhost:3000/documents');    
    //super.setItems(MOCKITEMS);
  }
}

