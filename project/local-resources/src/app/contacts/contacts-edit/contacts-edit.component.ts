import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contacts-edit',
  templateUrl: './contacts-edit.component.html',
  styleUrls: ['./contacts-edit.component.css']
})

export class ContactsEditComponent implements OnInit {
  originalContact!: Contact | null;
  item!: Contact;
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

          this.originalContact = this.contactService.getItem(foundID);

          if ((this.originalContact === undefined)
            || (this.originalContact === null)) {
            return;
          }

          this.editMode = true;
          this.item = JSON.parse(JSON.stringify(this.originalContact));
        }
      );
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {// newContact has no value
      return true;
    } if (this.item && newContact.id === this.item.id) {
      return true;
    }
    for (const item of this.groupContacts) {
      if (newContact.id === item.id) {
        return true;
      }
    }
    return false;
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newContact = new Contact(value['id'], value['name'], value['email'], value['phone'], value['imageUrl']);

    if (this.editMode) {
      if (this.originalContact !== null)
        this.contactService.updateItem(this.originalContact, newContact);
    } else {
      this.contactService.addItem(newContact);
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
