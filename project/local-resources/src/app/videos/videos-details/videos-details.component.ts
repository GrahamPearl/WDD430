import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WindRefService } from '../../../wind-ref.service';
import { AbstractDetailsComponent } from '../../listable/abstract-details-component-from-seed';

import { Video } from '../video.model';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-videos-details',
  templateUrl: './videos-details.component.html',
  styleUrls: ['./videos-details.component.css']
})

export class VideosDetailsComponent extends AbstractDetailsComponent<Video> {
  redirect: string;

  constructor(
    itemService: VideoService,
    router: Router,
    activatedRoute: ActivatedRoute,
    windRefService: WindRefService
  ) {
    super(itemService, router, activatedRoute, windRefService); //
    this.redirect = '\videos';
  }

  onView(): void {
    let gotoUrl = 'https://www.youtube.com/embed/' + this.item.videoUrl;
    this.nativeWindow.open(gotoUrl);
  }
}