import { Component, Input, OnInit } from '@angular/core';
import { Video } from '../video.model';

@Component({
  selector: 'app-videos-item',
  templateUrl: './videos-item.component.html',
  styleUrls: ['./videos-item.component.css']
})
export class VideosItemComponent implements OnInit {
  @Input()
  video!: Video;
  constructor() { }

  ngOnInit(): void {
  }

}
