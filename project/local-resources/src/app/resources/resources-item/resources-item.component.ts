import { Component, Input, OnInit } from '@angular/core';
import { Resource } from '../resource.model';

@Component({
  selector: 'app-resources-item',
  templateUrl: './resources-item.component.html',
  styleUrls: ['./resources-item.component.css']
})
export class ResourcesItemComponent implements OnInit {
  @Input()
  item!: Resource;
  constructor() { }

  ngOnInit(): void {
  }
}
