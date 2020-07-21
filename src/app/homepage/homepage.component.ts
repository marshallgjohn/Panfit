import { Component, OnInit } from '@angular/core';
import {AccountService } from '../services/account.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'; 
import {PreworkoutpageComponent}  from '../preworkoutpage/preworkoutpage.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.sass'],
})
export class HomepageComponent implements OnInit {

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

}
