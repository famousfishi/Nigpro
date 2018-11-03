import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';

/*
  Generated class for the PusherProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PusherProvider {
  channel: any;

  constructor(public http: HttpClient) {
    console.log('Hello PusherProvider Provider');

    let pusher = new Pusher('3800bc824539f40d5823', {
      cluster: 'eu',
      encrypted: true,
    });
    this.channel = pusher.subscribe('my-channel');

  }

  public init(){
    return this.channel;
  }

}
