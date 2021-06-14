import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})

export class DocumentEditComponent implements OnInit {
  origionalDocument!: Document | null;
  document!: Document;
  editMode: boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private activatedRoute: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          let foundID = params['id'];

          if ((foundID === undefined) || (foundID === null)) {
            this.editMode = false;
            return;
          }

          this.origionalDocument = this.documentService.getDocument(foundID);

          if ((this.origionalDocument === undefined) || (this.origionalDocument === null)) {
            return;
          }

          this.editMode = true;
          this.document = JSON.parse(JSON.stringify(this.origionalDocument));
        }
      );
  }

  onCancel() {
    this.router.navigate(['\documents']);
  }

  onSubmit(form: NgForm) {
    let value = form.value;
    let newDocument = new Document('',value['name'],value['description'],value['url'],null);
    if (this.editMode)
       {
         if (this.origionalDocument !== null)
         this.documentService.updateDocument(this.origionalDocument,newDocument);
       } else
       {
         this.documentService.addDocument(newDocument);
       }
       this.router.navigate(['\documents']);
  }

}
