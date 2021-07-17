import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  messageListChangedEvent = new Subject<Message[]>();
  maxMessageId: number;

  constructor(private http: HttpClient) {
    /*
    http.get<Message[]>('https://pearlgwdd430-default-rtdb.firebaseio.com/messages.json').subscribe((items: Message[]) => {
      this.setItems(items);
    });
    */

    http.get<{ message: string; messages: Message[] }>('http://localhost:3000/messages').subscribe(response => {
      this.setItems(response.messages);
    });    
  }

  public setItems(messages: Message[]) {
    try {
      this.messages = messages;
      this.maxMessageId = this.getMaxID();

      this.messages.sort(function (a, b) {
        if (a.id < b.id) { return -1; }
        else if (a.id > b.id) { return 1; }
        else { return 0; }
      });

      let messagesListClone = this.messages.slice();
    } catch (error: any) {
      console.log(error);
    }
  }

  public storeMessages(messages: Message[]) {

    let data = JSON.stringify(this.messages);
    let httpHeader: HttpHeaders = new HttpHeaders();
    httpHeader.set('Content-Type', 'application/json');

    this.http.put('https://pearlgwdd430-default-rtdb.firebaseio.com/messages.json', data, { 'headers': httpHeader })
      .subscribe(() => {
        let messagesListClone = this.messages.slice();
        this.messageListChangedEvent.next(messagesListClone);
      }
      );
  }

  private getMaxID(): number {

    let maxId = 0

    for (let message of this.messages) {
      let currentId = parseInt(message.id)
      if (currentId > maxId) maxId = currentId
    }

    return maxId
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


  addMessage(newMessage: Message) {
    if ((newMessage === undefined) || (newMessage === null)) {
      return;
    } else {
      this.maxMessageId++;

      newMessage.id = this.maxMessageId.toString();
      this.messages.push(newMessage);

      let MessagesListClone = this.messages.slice();
      //this.MessageListChangedEvent.next(MessagesListClone);
      this.storeMessages(MessagesListClone);
    }
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if
      ((originalMessage === undefined) || (originalMessage === null) ||
      (newMessage === undefined) || (newMessage === null)) {
      return;
    } else {

      const pos = this.messages.indexOf(originalMessage);
      if (pos < 0) {
        return;
      }
      newMessage.id = originalMessage.id
      this.messages[pos] = newMessage;

      let MessagesListClone = this.messages.slice();
      //this.MessageListChangedEvent.next(MessagesListClone);
      this.storeMessages(MessagesListClone);
    }
  }

  deleteMessage(Message: Message) {
    if ((Message === undefined) || ((Message === null))) {
      return;
    }

    const pos = this.messages.indexOf(Message);
    if (pos < 0)
      return;

    this.messages.splice(pos, 1);
    let MessagesListClone = this.messages.slice();
    //this.MessageListChangedEvent.next(MessagesListClone);
    this.storeMessages(MessagesListClone);
  }

  /*addMessage(message : Message) {  
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
  }
  */

}
