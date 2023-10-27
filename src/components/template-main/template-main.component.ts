import { Component, ViewChild, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-template-main',
  templateUrl: './template-main.component.html',
  styleUrls: ['./template-main.component.css']
})
export class TemplateMainComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = false;
  menus: any[] = []

  constructor(private observer: BreakpointObserver) {}

  handleToggleMenu() {
    if(this.isMobile){
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }

  ngOnInit() {
    this.menus = [
      { path: '/post', name: 'Post', icon: 'description' },
      { path: '/comment', name: 'Comment', icon: 'comment' },
      { path: '/album', name: 'Album', icon: 'photo_library' },
      { path: '/photo', name: 'Photo', icon: 'photo' },
      { path: '/todo', name: 'Todo', icon: 'assignment' },
      { path: '/user', name: 'User', icon: 'people' },
      { path: '/logout', name: 'Logout', icon: 'logout' }
    ]
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }
}
