import { Injectable } from '@angular/core';
//import { resourceLimits } from 'node:worker_threads';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  contacts: Contact[] = [];
  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  public getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string) : Contact | null {
    if (!this.contacts) {
      return null;
    }
    
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      } 
    }
    return null;    
  }

}
