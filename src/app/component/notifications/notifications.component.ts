import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.sass']
})
export class NotificationsComponent implements OnInit {

  private _notifText: string;

  constructor(private notif: NotificationService) { }

  ngOnInit(): void {
    this.notif.currentNotification.subscribe(data => {
      if(data.message !== "") 
        (data.isSuccess) ? this.onSuccess(data.message):this.onFail(data.message);
        this.notifText = data.message
    })

  }

  onSuccess(text: string) {
    document.getElementById("notification-window").style.backgroundColor = "#4adb62"
    document.getElementById("notification-window").classList.add("animation")
    setTimeout(()=> {
      document.getElementById("notification-window").classList.remove("animation")
    },3000)
  }

  onFail(text: string) {
    document.getElementById("notification-window").style.backgroundColor = "#DB504A"
    document.getElementById("notification-window").classList.add("animation")
    setTimeout(()=> {
      document.getElementById("notification-window").classList.remove("animation")
    },3000)
  }


    /**
     * Getter notifText
     * @return {string}
     */
	public get notifText(): string {
		return this._notifText;
	}

    /**
     * Setter notifText
     * @param {string} value
     */
	public set notifText(value: string) {
		this._notifText = value;
	}


}
