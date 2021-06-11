import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  origionalDocument!: Document;
  document!: Document;
  editMode : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  onCancel() {

  }

  onSubmit(form: NgForm) {

  }

}
