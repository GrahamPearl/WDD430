import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
  providers: [ ContactService ]
})

export class ContactListComponent implements OnInit {
// TO REMOVE
  //@Output() selectedContactEvent = new EventEmitter<Contact>();

  contacts: Contact[] = [];

  constructor(private contactService : ContactService) { 
  }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
  }

  onSelected(contact: Contact) {
    alert("Contact-list item selected: "+contact.name);

    this.contactService.contactSelectedEvent.emit(contact);
  }
}
