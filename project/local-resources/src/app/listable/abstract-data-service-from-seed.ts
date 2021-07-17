import { EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Listable } from './listable';

export abstract class AbstractDataServiceFromSeed<ModelDataType extends Listable> {
  private items: ModelDataType[] = [];
  private maxId = 0;
  itemSelectedEvent = new EventEmitter<ModelDataType>();
  itemChangedEvent = new EventEmitter<ModelDataType[]>();
  listChangedEvent = new Subject<ModelDataType[]>();

  constructor() {
    this.items = this.seedData();
    this.maxId = this.getMaxId();
  }
  
  abstract seedData(): ModelDataType[];

  getMaxId(): number {
    let maxId = 0;
    this.items.forEach(element => {
      let currentId = +element.id;
      if (currentId > maxId) {
        maxId = currentId;
      }
    });
    return maxId;
  }

  getItems(): ModelDataType[] {
    return this.items.slice();
  }

  getItem(id: string): ModelDataType | null {
    for (const element of this.items) {
      if (element.id === id)
        return element;
    }
    return null;
  }

  deleteItem(item: ModelDataType) {
    if (!item) {
      return;
    }
    const pos = this.items.indexOf(item);
    if (pos < 0) {
      return;
    }
    this.items.splice(pos, 1);
    this.listChangedEvent.next(this.items.slice());
  }

  addItem(newItem: ModelDataType): void {
    if (!newItem) {
      return;
    }
    this.maxId++;
    newItem.id = this.maxId.toString();
    this.items.push(newItem);
    this.listChangedEvent.next(this.items.slice());
  }

  updateItem(originalItem: ModelDataType, newItem: ModelDataType) {
    if (!originalItem || !newItem) {
      return;
    }
    let pos = this.items.indexOf(originalItem);
    if (pos < 0) {
      return;
    }
    newItem.id = originalItem.id;
    this.items[pos] = newItem;
    this.listChangedEvent.next(this.items.slice());
  }
}