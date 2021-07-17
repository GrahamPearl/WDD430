import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Notice } from '../notice.model';
import { NoticeService } from '../notice.service';
import { NoticeTypes } from '../notice.types';

import { Contact } from '../../contacts/contact.model';
import { ContactService } from '../../contacts/contact.service';
import { Observable } from 'rxjs';

/*
interface NoticeTypes {
  id: String;
  text : String;
}
*/

@Component({
  selector: 'app-notices-edit',
  templateUrl: './notices-edit.component.html',
  styleUrls: ['./notices-edit.component.css']
})

export class NoticesEditComponent implements OnInit {
  originalItem!: Notice | null;
  item!: Notice;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  noticeTypes! : NoticeTypes[];  //Observable<NoticeTypes[]>;
  noticeSelected! : String;
  id!: string;

  constructor(    
    private itemService: NoticeService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.noticeTypes = 
    [
      {id:'bg-dark', text:'Normal'},
      {id:'bg-info', text:'Important'},
      {id:'bg-danger', text:'Danger'},
      {id:'bg-primary', text:'System'},

    ];

    this.noticeSelected='bg-info'; 

    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          let foundID = params['id'];

          if ((foundID === undefined) || (foundID === null)) {
            this.editMode = false;
            return;
          }

          this.originalItem = this.itemService.getItem(foundID);

          if ((this.originalItem === undefined) || (this.originalItem === null)) {
            return;
          }

          this.editMode = true;
          this.item = JSON.parse(JSON.stringify(this.originalItem));

          if (this.originalItem.sender) {
            this.groupContacts = JSON.parse(JSON.stringify(this.originalItem.sender));
          }
        }
      );
  }

  isInvalidContact(newItem: Contact) {
    if (!newItem) {// new Contact sender has no value
      return true;
    } if (this.item && newItem.id === this.item.id) {
      return true;
    }
    for (const contact of this.groupContacts) {
      if (newItem.id === contact.id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {    
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
  }

  onNoticeTypeSelected(value : any) {
    this.onSelection(value)
  }

  onSelection(value: any)
  {
    this.item.type = ""+value;
    alert(this.item.type);
  }

  onSubmit(form: NgForm) {    
    let value = form.value;

    value.group = JSON.parse(JSON.stringify(this.groupContacts));    
    let newItem = new Notice(value['id'], value['title'], value['message'],value['type'], new Date().toISOString().slice(0, 10), value['sender']);

    //console.log("Testing Group data:"+JSON.stringify(newContact.group));

    if (this.editMode) {
      if (this.originalItem !== null)
        this.itemService.updateItem(this.originalItem, newItem);
    } else {
      this.itemService.addItem(newItem);
    }
    this.router.navigate(['\notices']);
  }

  onCancel() {
    this.router.navigate(['\notices']);
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }
}
