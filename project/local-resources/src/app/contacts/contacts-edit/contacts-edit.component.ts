import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-contacts-edit',
  templateUrl: './contacts-edit.component.html',
  styleUrls: ['./contacts-edit.component.css']
})

export class ContactsEditComponent implements OnInit {
  contact!: Contact;

  constructor(
) {
  }

  ngOnInit(): void {
  }
      
}
