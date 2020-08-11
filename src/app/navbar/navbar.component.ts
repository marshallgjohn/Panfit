import { Component, OnInit } from '@angular/core';
import {AccountService } from '../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  constructor(public accountService: AccountService,private router: Router) { }

  ngOnInit(): void {

  }

  logout() {
    this.accountService.logout()
    this.router.navigateByUrl("")
  }

}
