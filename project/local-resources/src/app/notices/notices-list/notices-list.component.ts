import { Component, OnInit, OnDestroy} from '@angular/core';
import { Notice } from '../notice.model';
import { NoticeService } from '../notice.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notices-list',
  templateUrl: './notices-list.component.html',
  styleUrls: ['./notices-list.component.css']
})
export class NoticesListComponent implements OnInit {
  
  subscription : Subscription | undefined;
  items: Notice[] = [];
  
  constructor(private aService : NoticeService) { }

  ngOnInit(): void {
    this.items = this.aService.getItems();
    this.aService.listChangedEvent
      .subscribe(
        (items: Notice[]) => {
          this.items = items;
        }
      );
     
      this.subscription = this.aService.listChangedEvent
      .subscribe(
        (itemList: Notice[]) => {        
          this.items = itemList;
        }
      );
  }

}
