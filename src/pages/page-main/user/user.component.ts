import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  public length = 0;
  public pageIndex = 0;
  public pageSize = 10;
  public pageSizeOptions = [5, 10, 25, 50];
  pageEvent: any;

  constructor(private userService: UserService) { }

  getDisplayStreet(address: UserAddress) {
    return address?.street ? `${address?.street}, ${address?.city} - ${address.zipcode}` : '-'
  }

  handlePageEvent(event: PageEvent) {
    this.pageEvent = event;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.handleFetchUser(this.pageIndex + 1, this.pageSize)
  }

  handleFetchUser(page = 0, limit = 10) {
    const params = { page, limit }
    this.userService.get(params).subscribe((result: User[]) => {
      this.displayedData = result
    })
  }

  handleFetchUserCount() {
    this.userService.get().subscribe((result: User[]) => {
      this.length = result?.length || 0
    })
  }

  ngOnInit() {
    this.displayedColumns = ['name', 'username', 'email', 'address']
    this.handleFetchUser()
    this.handleFetchUserCount()
  }
}
