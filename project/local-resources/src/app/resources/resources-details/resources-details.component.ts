import { AbstractDetailsComponent } from '../../listable/abstract-details-component-from-seed'
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from '../../../wind-ref.service';
import { Resource } from '../resource.model';
import { ResourceService } from '../resource.service';

@Component({
  selector: 'app-resources-details',
  templateUrl: './resources-details.component.html',
  styleUrls: ['./resources-details.component.css']
})
export class ResourcesDetailsComponent extends AbstractDetailsComponent<Resource> {
  redirect: string;
  
  constructor(
    itemService: ResourceService,
    router: Router,
    activatedRoute: ActivatedRoute,
    windRefService: WindRefService
  ) {
    super(itemService, router, activatedRoute, windRefService); //
    this.redirect = '\resources';
  }

}
