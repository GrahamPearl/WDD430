import { AbstractDataService } from '../listable/abstract-data-service';
import { Notice } from './notice.model';
import { MOCKITEMS } from './MOCKITEMS';
import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class NoticeService extends AbstractDataService<Notice> {
  seedData(): Notice[] {
    return MOCKITEMS;
  }
}

