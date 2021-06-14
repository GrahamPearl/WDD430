import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor(private http: HttpClient, private documentService: DocumentService) {
    /*

    http.get<Document[]>('https://pearlgwdd430-default-rtdb.firebaseio.com/documents.json').subscribe(

      (documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();

        this.documents.sort(function (a, b) {
          if (a.name < b.name) { return -1 }
          else if (a.name > b.name) { return 1 }
          else { return 0 }
        });

        let documentsListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentsListClone);
      }
      ,
      (error: any) => {
        console.log(error);
      }
    );
    */
    // Code used prior to week 9
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  public storeDocuments(documents: Document[]) {
    let data = JSON.stringify(this.documents);
    let httpHeader: HttpHeaders = new HttpHeaders();
    httpHeader.set('Content-Type', 'application/json');

    //http.put('https://pearlgwdd430-default-rtdb.firebaseio.com/pearlgwdd430-default-rtdb.json',documents)
    this.http.put('https://pearlgwdd430-default-rtdb.firebaseio.com/posts.json', data)
      .subscribe(() => {
        let documentsListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentsListClone);
      }
      );

    //http.
  }

  public getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document | null {
    if (!document) {
      return null;
    }

    for (let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }

    return null;
  }

  getMaxId(): number {

    let maxId = 0

    for (let document of this.documents) {
      let currentId = parseInt(document.id)
      if (currentId > maxId) maxId = currentId
    }

    return maxId
  }

  addDocument(newDocument: Document) {
    if ((newDocument === undefined) || (newDocument === null)) {
      return;
    } else {
      this.maxDocumentId++;

      newDocument.id = this.maxDocumentId.toString();
      this.documents.push(newDocument);

      let documentsListClone = this.documents.slice();
      this.documentListChangedEvent.next(documentsListClone);
      //this.storeDocuments(documentsListClone);
    }
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if
      ((originalDocument === undefined) || (originalDocument === null) ||
      (newDocument === undefined) || (newDocument === null)) {
      return;
    } else {
      const pos = this.documents.indexOf(originalDocument);
      if (pos < 0) {
        return;
      }
      newDocument.id = originalDocument.id
      this.documents[pos] = newDocument;

      let documentsListClone = this.documents.slice();
      this.documentListChangedEvent.next(documentsListClone);
      //this.storeDocuments(documentsListClone);
    }
  }

  deleteDocument(document: Document) {
    if ((document === undefined) || ((document === null))) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0)
      return;

    this.documents.splice(pos, 1);
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
    //this.storeDocuments(documentsListClone);
  }

}
