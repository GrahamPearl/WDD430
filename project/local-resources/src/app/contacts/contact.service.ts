import { EventEmitter,Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractDataServiceFromHttp } from '../listable/abstract-data-service-from-http';
import { Contact } from './contact.model';

@Injectable({
  providedIn: 'root'
})

export class ContactService extends AbstractDataServiceFromHttp<Contact> {
  
  constructor(http: HttpClient) {
    super(http,'https://pearlgwdd430-default-rtdb.firebaseio.com/contacts.json');        
  }
}