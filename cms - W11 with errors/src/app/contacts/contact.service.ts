import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;


  constructor(private http: HttpClient) {
    http.get<Contact[]>('https://pearlgwdd430-default-rtdb.firebaseio.com/contacts.json').subscribe(

      (contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();

        this.contacts.sort(function (a, b) {
          if (a.name < b.name) { return -1 }
          else if (a.name > b.name) { return 1 }
          else { return 0 }
        });

        let contactsListClone = this.contacts.slice();
        this.contactListChangedEvent.next(contactsListClone);
      }
      ,
      (error: any) => {
        console.log(error);
      }
    );
    //this.contacts = MOCKCONTACTS;
    //this.maxContactId = this.getMaxId();
  }

  public storeContacts(contacts: Contact[]) {
    
    let data = JSON.stringify(this.contacts);
    let httpHeader: HttpHeaders = new HttpHeaders();
    httpHeader.set('Content-Type', 'application/json');
    
    this.http.put('https://pearlgwdd430-default-rtdb.firebaseio.com/contacts.json', data, {'headers': httpHeader })
      .subscribe(() => {
        let contactsListClone = this.contacts.slice();
        this.contactListChangedEvent.next(contactsListClone);
      }
      );      
  }

  public getContacts(): Contact[] {
    return this.contacts.slice();
  }


  getContact(id: string): Contact | null {
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

  getMaxId(): number {

    let maxId = 0

    for (let contact of this.contacts) {
      let currentId = parseInt(contact.id)
      if (currentId > maxId) maxId = currentId
    }

    return maxId
  }

  addContact(newContact: Contact) {
    if ((newContact === undefined) || (newContact === null)) {
      return;
    } else {
      this.maxContactId++;

      newContact.id = this.maxContactId.toString();
      this.contacts.push(newContact);

      let contactsListClone = this.contacts.slice();
      //this.contactListChangedEvent.next(contactsListClone);
      this.storeContacts(contactsListClone);
    }
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if
      ((originalContact === undefined) || (originalContact === null) ||
      (newContact === undefined) || (newContact === null)) {
      return;
    } else {

      const pos = this.contacts.indexOf(originalContact);
      if (pos < 0) {
        return;
      }
      newContact.id = originalContact.id
      this.contacts[pos] = newContact;

      let contactsListClone = this.contacts.slice();
      //this.contactListChangedEvent.next(contactsListClone);
      this.storeContacts(contactsListClone);
    }
  }

  deleteContact(contact: Contact) {
    if ((contact === undefined) || ((contact === null))) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0)
      return;

    this.contacts.splice(pos, 1);
    let contactsListClone = this.contacts.slice();
    //this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts(contactsListClone);
  }
}
