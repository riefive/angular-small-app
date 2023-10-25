import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';
import { User, UserAddress } from 'src/types/user.type';

@Component({
  selector: 'app-section-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public displayedColumns: string[] = []
  public displayedData: User[] = []

  constructor(private userService: UserService) { }

  getDisplayStreet(address: UserAddress) {
    return address?.street ? `${address?.street}, ${address?.city} - ${address.zipcode}` : '-'
  }

  ngOnInit() {
    this.displayedColumns = ['name', 'username', 'email', 'address']
    this.userService.get().subscribe((result: User[]) => {
      this.displayedData = result
    })
  }
}
