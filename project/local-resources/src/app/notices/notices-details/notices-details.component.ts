import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from '../../../wind-ref.service';
import { Notice } from '../notice.model';
import { NoticeService } from '../notice.service';

@Component({
  selector: 'app-notices-details',
  templateUrl: './notices-details.component.html',
  styleUrls: ['./notices-details.component.css']
})

export class NoticesDetailsComponent implements OnInit {
  nativeWindow: any;
  item!: Notice;

  constructor(
    private itemService: NoticeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private windRefService: WindRefService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          let foundID: string;
          foundID = params['id'];
          let itemFound: Notice | null = this.itemService.getItem(foundID); 
          if (itemFound !== null)
            this.item = itemFound;
        }
      );

    this.nativeWindow = this.windRefService.getNativeWindow();
  }

  onDelete() {
    this.itemService.deleteItem(this.item);
    this.router.navigate(['\notices']);
  }

}
