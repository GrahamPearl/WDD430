import { AbstractDataServiceFromSeed } from '../listable/abstract-data-service-from-seed';
import { Video } from './video.model';
import { MOCKITEMS } from './MOCKITEMS';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoService extends AbstractDataServiceFromSeed<Video> {

  constructor() {
    super();
    super.setItems(MOCKITEMS);
  }
}
