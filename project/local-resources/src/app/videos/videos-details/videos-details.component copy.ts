import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from '../../../wind-ref.service';
import { Video } from '../video.model';
import { VideoService } from '../video.service';


@Component({
  selector: 'app-videos-details',
  templateUrl: './videos-details.component.html',
  styleUrls: ['./videos-details.component.css']
})
export class VideosDetailsComponent implements OnInit {
  nativeWindow: any;
  item!: Video;

  constructor(
    private itemService: VideoService,
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
          let itemFound: Video | null = this.itemService.getItem(foundID);
          if (itemFound !== null)
            this.item = itemFound;
        }
      );

      this.nativeWindow = this.windRefService.getNativeWindow();
  }

  onDelete() {
    this.itemService.deleteItem(this.item);
    this.router.navigate(['\videos']);
  }

}