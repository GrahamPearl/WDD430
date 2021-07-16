import { Component, OnInit, OnDestroy} from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})

export class ContactsListComponent implements OnInit, OnDestroy {
  subscription : Subscription | undefined;
  contacts: Contact[] = [];
  term!: string;

  constructor(private contactService : ContactService) { 
  }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
      );

      this.subscription = this.contactService.contactListChangedEvent
      .subscribe(
        (contactsList: Contact[]) =>
        {
          this.contacts = contactsList;
        }
      );
  }  

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  search(value: String) {
    this.term = value.toString();
  }
}
