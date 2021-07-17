import { Component, OnInit, OnDestroy} from '@angular/core';
import { Resource } from '../resource.model';
import { ResourceService } from '../resource.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.css']
})
export class ResourcesListComponent implements OnInit {
  subscription : Subscription | undefined;
  items: Resource[] = [];
  
  constructor(private aService : ResourceService) { }

  ngOnInit(): void {
    this.items = this.aService.getItems();
    this.aService.listChangedEvent
      .subscribe(
        (items: Resource[]) => {
          this.items = items;
        }
      );
     
      this.subscription = this.aService.listChangedEvent
      .subscribe(
        (itemList: Resource[]) => {        
          this.items = itemList;
        }
      );
  }

}
