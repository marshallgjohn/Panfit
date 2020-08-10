import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Notification} from '../model/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notification = new BehaviorSubject(new Notification("",false));
  currentNotification = this.notification.asObservable();


  constructor() { }

  changeNotification(r: Notification) {
    this.notification.next(r)
  }
  
}
