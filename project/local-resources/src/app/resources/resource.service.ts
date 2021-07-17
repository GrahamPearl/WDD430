import { AbstractDataServiceFromSeed } from '../listable/abstract-data-service-from-seed';
import { Resource } from './resource.model';
import { MOCKITEMS } from './MOCKITEMS';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResourceService extends AbstractDataServiceFromSeed<Resource> {
  seedData(): Resource[] {
    return MOCKITEMS;
  }
}
