import { EventEmitter,Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from './contact.model';
import { AbstractDataService } from '../listable/abstract-data-service';


@Injectable({
  providedIn: 'root'
})

export class ContactService extends AbstractDataService<Contact> {
  
  constructor(http: HttpClient) {
    super(http,'https://pearlgwdd430-default-rtdb.firebaseio.com/contacts.json');
  }
}