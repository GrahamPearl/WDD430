import { EventEmitter,Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractDataServiceFromHttp } from '../listable/abstract-data-service-from-http';
import { Resource } from './resource.model';
import { MOCKITEMS } from './MOCKITEMS';

@Injectable({
  providedIn: 'root'
})
export class ResourceService extends AbstractDataServiceFromHttp<Resource> {
  
  constructor(http: HttpClient) {
    super(http,'https://pearlgwdd430-default-rtdb.firebaseio.com/resources.json');
    //super.setItems(MOCKITEMS);
  }
}
