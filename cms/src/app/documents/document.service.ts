import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})

export class DocumentService {
  documents: Document[] = [];

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  public getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document | null {
    if (!this.documents) {
      return null;
    }

    for (let document of this.documents) {
      /*if (document.url === id) {
        return document;
      }
      */
    }
    return null;
  }

}
