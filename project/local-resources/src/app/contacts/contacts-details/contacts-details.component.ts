import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WindRefService } from '../../../wind-ref.service';
import { AbstractDetailsComponent } from '../../listable/abstract-details-component-from-seed';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contacts-details',
  templateUrl: './contacts-details.component.html',
  styleUrls: ['./contacts-details.component.css']
})

export class ContactsDetailsComponent extends AbstractDetailsComponent<Contact>{
  redirect: string;

  constructor(
    itemService: ContactService,
    router: Router,
    activatedRoute: ActivatedRoute,
    windRefService: WindRefService
  ) {
    super(itemService, router, activatedRoute, windRefService);
    this.redirect = '\contacts';
  }

}