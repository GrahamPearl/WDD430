import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contacts-item',
  templateUrl: './contacts-item.component.html',
  styleUrls: ['./contacts-item.component.css']
})

export class ContactsItemComponent implements OnInit {
  @Input()
  item!: Contact;
  subscription! : Subscription;

  constructor() { }

  ngOnInit(): void {
  }

}
