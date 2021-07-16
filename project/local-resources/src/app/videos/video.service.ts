import { AbstractDataService } from '../listable/abstract-data-service';
import { Video } from './video.model';
import { MOCKITEMS } from './MOCKITEMS';
import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoService extends AbstractDataService<Video> {
  seedData(): Video[] {
    return MOCKITEMS;
  }
}
