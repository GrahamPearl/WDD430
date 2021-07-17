
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Video } from '../video.model';
import { VideoService } from '../video.service';


@Component({
  selector: 'app-videos-edit',
  templateUrl: './videos-edit.component.html',
  styleUrls: ['./videos-edit.component.css']
})
export class VideosEditComponent implements OnInit {
  originalVideo!: Video | null;
  item!: Video;
  editMode: boolean = false;
  id!: string;

  constructor(
    private VideoService: VideoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          let foundID = params['id'];

          if ((foundID === undefined) || (foundID === null)) {
            this.editMode = false;
            return;
          }

          this.originalVideo = this.VideoService.getItem(foundID);

          if ((this.originalVideo === undefined)
            || (this.originalVideo === null)) {
            return;
          }

          this.editMode = true;
          this.item = JSON.parse(JSON.stringify(this.originalVideo));
        }
      );
  }

  
  onSubmit(form: NgForm) {
    let value = form.value;
    let newContact = new Video(value['id'], value['name'], value['videoUrl']);

    if (this.editMode) {
      if (this.originalVideo !== null)
        this.VideoService.updateItem(this.originalVideo, newContact);
    } else {
      this.VideoService.addItem(newContact);
    }
    this.router.navigate(['\videos']);
  }

  onCancel() {
    this.router.navigate(['\videos']);
  }
}
