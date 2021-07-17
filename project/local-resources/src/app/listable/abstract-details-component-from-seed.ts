import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Listable } from './listable';
import { AbstractDataServiceFromSeed } from './abstract-data-service-from-seed';
import { WindRefService } from '../../wind-ref.service';

@Component({
  template: ''
})

export abstract class AbstractDetailsComponent<T extends Listable> implements OnInit {
  nativeWindow: any;
  item!: T;
  abstract redirect: string;

  constructor(    
    private itemService: AbstractDataServiceFromSeed<T>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private windRefService?: WindRefService,
  ) { 
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          let foundID: string;
          foundID = params['id'];
          let itemFound: T | null = this.itemService.getItem(foundID);
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
