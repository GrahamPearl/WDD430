import { Component, Input, OnInit } from '@angular/core';
import { Notice } from '../notice.model';

@Component({
  selector: 'app-notices-item',
  templateUrl: './notices-item.component.html',
  styleUrls: ['./notices-item.component.css']
})
export class NoticesItemComponent implements OnInit {
  @Input()
  notice!: Notice;
  constructor() { }

  ngOnInit(): void {
  }

}