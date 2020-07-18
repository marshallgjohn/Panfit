import { Component, OnInit } from '@angular/core';
import {AccountService } from '../services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  constructor(public accountService: AccountService) { }

  ngOnInit(): void {

  }

}
