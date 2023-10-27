import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  private router = inject(Router)
  private userService = inject(UserService)

  constructor() { }

  ngOnInit() {
    this.userService.clear()
    this.router.navigateByUrl('/login')
  }

}
