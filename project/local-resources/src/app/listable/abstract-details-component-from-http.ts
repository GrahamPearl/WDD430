import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';
import { Listable } from './listable';
import { AbstractDataService } from './abstract-data-service';

@Component({
  template: ''
})

export abstract class AbstractDetailsComponent<ModelDataType extends Listable> implements OnInit {
  nativeWindow: any;
  item!: ModelDataType;
  abstract redirect: string;

  constructor(    
    private itemService: AbstractDataService<ModelDataType>,
    private router: Router,
    private activatedRoute: ActivatedRoute    
  ) { 
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          let foundID: string;
          foundID = params['id'];
          let itemFound: ModelDataType | null = this.itemService.getItem(foundID);
          if (itemFound !== null)
            this.item = itemFound;
        }
      );    
  }

  onDelete() {
    this.itemService.deleteItem(this.item);
    this.router.navigate([this.redirect.toString()]);
  }
}
