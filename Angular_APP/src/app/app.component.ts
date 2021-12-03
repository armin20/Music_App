/*********************************************************************************
*  WEB422 – Assignment 06
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
*  assignment has been copied manually or electronically from any other source (including web sites) or 
*  distributed to other students.
* 
*  Name: Armin Sharifiyan Student ID: 130891203 Date: December 3, 2021
*
*  Angular App (Deployed) Link: https://music-app-v1.vercel.app
*
*  User API (Heroku) Link: https://calm-anchorage-61423.herokuapp.com/api/user
*
********************************************************************************/ 

import {  NavigationStart, Router, Event } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  searchString: String = "";

  title = 'web-assignment6';
  public token: any;

  constructor(private router: Router, private AuthService: AuthService){  }

  handleSearch(): void{
    this.router.navigate(['/search'], {queryParams: {q: this.searchString}});
    this.searchString = "";
    
  } 

  logout(): void{
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  
  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
        this.token = this.AuthService.readToken();
      }
    });
  }
  
}
