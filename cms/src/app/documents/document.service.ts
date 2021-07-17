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

  constructor(private http: HttpClient) {
    /* OBTAINING DATA FROM FIREBASE
    http.get<Document[]>('https://pearlgwdd430-default-rtdb.firebaseio.com/documents.json').subscribe((documents: Document[]) => {
        this.setDocument(documents);
      });
    */
    http.get<{ message: string; documents: Document[] }>('http://localhost:3000/documents').subscribe(response => {
      console.log(response.message);
      this.setDocument(response.documents);
    });
  }

  public storeDocuments(documents: Document[]) {

    let data = JSON.stringify(this.documents);
    let httpHeader: HttpHeaders = new HttpHeaders();
    httpHeader.set('Content-Type', 'application/json');

    //this.http.put('https://pearlgwdd430-default-rtdb.firebaseio.com/documents.json', data, { 'headers': httpHeader })
    this.http.put('http://localhost:3000/documents', data, { 'headers': httpHeader })
      .subscribe(() => {
        let documentsListClone = this.documents.slice();
        this.documentListChangedEvent.next(documentsListClone);
      }
      );
  }

  public getDocuments(): Document[] {
    return this.documents;
  }

  public setDocument(documents: Document[]) {
    try {
      this.documents = documents;
      this.maxDocumentId = this.getMaxId();

      this.documents.sort(function (a, b) {
        if (a.name < b.name) { return -1 }
        else if (a.name > b.name) { return 1 }
        else { return 0 }
      });

      let documentsListClone = this.documents.slice();
      this.documentListChangedEvent.next(documentsListClone);
    } catch (error: any) {
      console.log(error);
    }
  }

  public getDocument(id: string): Document | null {
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

  public getMaxId(): number {

    let maxId = 0

    for (let document of this.documents) {
      let currentId = parseInt(document.id)
      if (currentId > maxId) maxId = currentId
    }

    return maxId
  }

  public addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);

          let documentsListClone = this.documents.slice();
          this.storeDocuments(documentsListClone);
        }
      );
  }

  public updateDocument(originalDocument: Document, newDocument: Document) {
    /*
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
      //this.documentListChangedEvent.next(documentsListClone);
      this.storeDocuments(documentsListClone);
    }
    */
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    //newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          //this.sortAndSend();
        }
      );
  }

  public deleteDocument(document: Document) {
    if ((document === undefined) || ((document === null))) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0)
      return;

    this.documents.splice(pos, 1);
    let documentsListClone = this.documents.slice();
    //this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments(documentsListClone);
  }

}