import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
  providers: [ MessageService ]
})
export class MessageListComponent implements OnInit {
  @Input('sent_message') element!: Message;

  messages: Message[] = [];

  constructor(private messageService : MessageService) { }

  ngOnInit(): void {
    //this.messages = this.messageService.getMessages();
    
    this.messageService.messageChangedEvent.subscribe();
    this.messages = this.messageService.getMessages();

  }

  onAddMessage(message: Message) {    
    this.messages.push(message);
  }

}
