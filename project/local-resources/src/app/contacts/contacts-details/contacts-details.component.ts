import { AbstractDetailsComponent } from '../../listable/abstract-details-component-from-http'
import { WindRefService } from '../../../wind-ref.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contacts-details',
  templateUrl: './contacts-details.component.html',
  styleUrls: ['./contacts-details.component.css']
})

//

export class ContactsDetailsComponent extends AbstractDetailsComponent<Contact>{
  redirect: string;

  constructor(
    itemService: ContactService,
    router: Router,
    activatedRoute: ActivatedRoute
  )
  {
    super(itemService, router, activatedRoute);
    this.redirect = '\resources';
  }

}