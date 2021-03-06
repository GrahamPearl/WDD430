import { Component, Input, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  @Input()
  selectedItem!: Contact;
  constructor(private contactService : ContactService) { }

  ngOnInit(): void {
    //alert('Responding to Contact selected');    
    this.contactService.itemSelectedEvent
    .subscribe(
            
      (item: Contact) => {                 
        this.selectedItem = item; 
      }      
    )
  }


}
