import { Component, OnInit, OnDestroy} from '@angular/core';
import { Video } from '../video.model';
import { VideoService } from '../video.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.css']
})
export class VideosListComponent implements OnInit {

  subscription : Subscription | undefined;
  items: Video[] = [];
  term!: string;
  
  constructor(private aService : VideoService) { }

  ngOnInit(): void {
    this.items = this.aService.getItems();
    this.aService.listChangedEvent
      .subscribe(
        (items: Video[]) => {
          this.items = items;
        }
      );
     
      this.subscription = this.aService.listChangedEvent
      .subscribe(
        (itemList: Video[]) => {        
          this.items = itemList;
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  search(value: String) {
    this.term = value.toString();
  }
}
