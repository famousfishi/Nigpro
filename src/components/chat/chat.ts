import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 } from 'uuid';
import {PusherProvider} from '../../providers/pusher/pusher';
import * as Pusher from 'pusher-js';

interface Message {
  id: string;
  text: string;
  timeStamp: Date;
  type: string;
}

var p:any;

@Component({
  selector: 'chat',
  templateUrl: 'chat.html',
})

export class ChatComponent implements OnInit {
    
  constructor(private http: HttpClient, private pusher: PusherProvider) {
      
  }

  messages: Array<Message> = [];
  message: string = '';
  lastMessageId;

  sendMessage() {
    if (this.message !== '') {
      // Assign an id to each outgoing message. It aids in the process of differentiating between outgoing and incoming messages
      this.lastMessageId = v4();
      const data = {
        id: this.lastMessageId,
        text: this.message,
      };

      this.http
        .post(`http://localhost:7000/messages`, data)
        .subscribe((res: Message) => {
          const message = {
            ...res,
            // The message type is added to distinguish between incoming and outgoing             messages. It also aids with styling of each message type
            type: 'outgoing',
          };
          this.messages = this.messages.concat(message);
          this.message = '';
        });

    }
  }

  // This method adds classes to the element based on the message type
  getClasses(messageType) {
    return {
      incoming: messageType === 'incoming',
      outgoing: messageType === 'outgoing',
    };
  }

  ngOnInit() {
    const channel = this.pusher.init();
    channel.bind('my-event', (data) => {
      if (data.id !== this.lastMessageId) {
        const message: Message = {
          ...data,
          type: 'incoming',
        };
        this.messages = this.messages.concat(message);
      }
    });

    p = new Pusher('629119');
    var chan = p.subscribe('my-channel');
    p.bind('my-event', function(data) {
        console.log('Hello guys! I came as fast as I can from PusherJS');
        console.log('Here is your message: ');
        console.log(data);
    });
    chan.bind('pusher:subscription_succeeded', function(){
    console.log('We are now listening on channel: my-channel');
    });
    chan.bind('pusher:subscription_error', function(status) {
        console.log('Unable to subscribe to pusher channel.');
        console.log(status);
    });
  }
}
