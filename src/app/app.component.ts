import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-small-app';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile = true;
  isCollapsed = false;
  menus: any[] = []

  constructor(private observer: BreakpointObserver) {}

  onToggleMenu() {
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
      { path: '/user', name: 'User', icon: 'people' }
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
