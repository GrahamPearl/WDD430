import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'Ariel', 'The Little Mermaid, The Little Mermaid II', 'https://disneyprincess.fandom.com/wiki/Ariel', undefined),
    new Document('2', 'Belle', 'Beauty and the Beast', 'https://disneyprincess.fandom.com/wiki/Belle', undefined),
    new Document('3', 'Jasmine', 'Aladdin', 'https://disneyprincess.fandom.com/wiki/Jasmine', undefined),
    new Document('4', 'Mulan', 'Mulan,  Mulan II', 'https://disneyprincess.fandom.com/wiki/Mulan', undefined),
    new Document('5', 'Merida', 'Brave', 'https://disneyprincess.fandom.com/wiki/Merida', undefined)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
