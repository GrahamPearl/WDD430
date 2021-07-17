import { AbstractDataServiceFromSeed } from '../listable/abstract-data-service-from-seed';
import { Notice } from './notice.model';
import { MOCKITEMS } from './MOCKITEMS';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class NoticeService extends AbstractDataServiceFromSeed<Notice> {
  constructor() {
    super();
    super.setItems(MOCKITEMS);
  }
}

