import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact!: Contact | null;
  contact!: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id!: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          let foundID = params['id'];

          if ((foundID === undefined) || (foundID === null)) {
            this.editMode = false;
            return;
          }

          this.originalContact = this.contactService.getContact(foundID);

          if ((this.originalContact === undefined) || (this.originalContact === null)) {
            return;
          }

          this.editMode = true;
          this.contact = JSON.parse(JSON.stringify(this.originalContact));

          if (this.originalContact.group) {
            this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
          }
        }
      );
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {// newContact has no value
      return true;
    } if (this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for (const contact of this.groupContacts) {
      if (newContact.id === contact.id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {

    alert("Drag and Drop - addToGroup Event activated!");

    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newContact = new Contact('', value['name'], value['email'], value['phone'], value['imageUrl'], null);
    if (this.editMode) {
      if (this.originalContact !== null)
        this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addcontact(newContact);
    }
    this.router.navigate(['\contacts']);
  }

  onCancel() {
    this.router.navigate(['\contacts']);
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }
}
