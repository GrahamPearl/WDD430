import { EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Listable } from './listable';

export abstract class AbstractDataService<T extends Listable> {
  private items: T[] = [];
  private maxId = 0;
  itemSelectedEvent = new EventEmitter<T>();
  itemChangedEvent = new EventEmitter<T[]>();
  listChangedEvent = new Subject<T[]>();
  url!: string;

  getMaxId(): number {
    let maxId = 0;
    this.items.forEach(element => {
      let currentId = +element.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  public getItems(): T[] {
    return this.items.slice();
  }

  public getItem(id: string): T | null {
    for (const element of this.items) {
      if (element.id === id)
        return element;
    }
    return null;
  }

  public setItems(items: T[]) {
    this.items = items;
    this.maxId = this.getMaxId();
  }

  public deleteItem(item: T) {
    if (!item) {
      return;
    }
    const pos = this.items.indexOf(item);
    if (pos < 0) {
      return;
    }
    this.items.splice(pos, 1);
    this.listChangedEvent.next(this.items.slice());
  }

  public addItem(newItem: T): void {
    if (!newItem) {
      return;
    }
    this.maxId++;
    newItem.id = this.maxId.toString();
    this.items.push(newItem);
    this.listChangedEvent.next(this.items.slice());
  }

  public updateItem(originalItem: T, newItem: T) {
    if (!originalItem || !newItem) {
      return;
    }
    let pos = this.items.indexOf(originalItem);
    if (pos < 0) {
      return;
    }
    newItem.id = originalItem.id;
    this.items[pos] = newItem;
    this.listChangedEvent.next(this.items.slice());
  }
}

/*
public getContacts(): ModelDataType[] {
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
*/