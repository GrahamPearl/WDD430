import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  messages: Message[] = [];
  constructor() {
    this.messages = MOCKMESSAGES;    
  }

  public getMessages(): Message[] {
    return this.messages.slice();
  }

  getMessage(id: string): Message | null {
    if (!this.messages) {
      return null;
    }

    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

}
