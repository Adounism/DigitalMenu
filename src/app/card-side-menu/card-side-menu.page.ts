import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-card-side-menu',
  templateUrl: './card-side-menu.page.html',
  styleUrls: ['./card-side-menu.page.scss'],
})
export class CardSideMenuPage implements OnInit {

  active = '';

  NAV = [
    {
      name: 'About',
      link: '/nav/about',
      icon: 'person-circle'
    },
    {
      name: 'Blog',
      link: '/nav/blog',
      icon: 'albums'
    },
    {
      name: 'Contact',
      link: '/nav/contact',
      icon: 'call'
    }
  ]

  constructor(private router:Router) {

   }

  ngOnInit() {
  }

}
