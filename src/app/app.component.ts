import { Component } from '@angular/core';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-small-app';
  type: string = 'main'
 
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.type = this.userService.isLoggedIn() ? 'main' : 'auth'
  }
}
