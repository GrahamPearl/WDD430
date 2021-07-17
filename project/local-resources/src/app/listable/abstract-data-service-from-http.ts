import { EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Listable } from './listable';
import { AbstractDataService } from './abstract-data-service';

export abstract class AbstractDataServiceFromHttp<T extends Listable> extends AbstractDataService<T> {
  itemSelectedEvent = new EventEmitter<T>();
  itemChangedEvent = new EventEmitter<T[]>();
  listChangedEvent = new Subject<T[]>();
  url!: string;

  constructor(private http: HttpClient, url: string) {
    super();
    this.http = http;
    this.url = url;

    http.get<T[]>(url).subscribe(

      (items: T[]) => {
        super.setItems(items);        

        let itemsListClone = super.getItems().slice();
        this.itemChangedEvent.next(itemsListClone);
      }
      ,
      (error: any) => {
        console.log(error);
      }
    );
  }

  public storeContacts(items: T[]) {

    let data = JSON.stringify(super.getItems());
    let httpHeader: HttpHeaders = new HttpHeaders();
    httpHeader.set('Content-Type', 'application/json');

    this.http.put(this.url, data, { 'headers': httpHeader })
      .subscribe(() => {
        let itemsListClone = super.getItems().slice();
        this.listChangedEvent.next(itemsListClone);
      }
      );
  }

}