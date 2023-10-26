import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { toTruncate } from "src/helpers/helper.string";
import { PostService } from 'src/services/post.service';
import { ModalRemoveDialogComponent } from 'src/components/modal-remove-dialog/modal-remove-dialog.component';
import { Post } from 'src/types/post.type';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  public displayedColumns: string[] = []
  public displayedData: Post[] = []
  public length = 0;
  public pageIndex = 0;
  public pageSize = 10;
  public pageSizeOptions = [5, 10, 25, 50];
  pageEvent: any;

  constructor(private route: ActivatedRoute, private router: Router, public dialog: MatDialog, 
    private postService: PostService, private userSrv: UserService) {
      console.log(this.userSrv.isLoggedIn());
    }

  handlePageEvent(event: PageEvent) {
    this.pageEvent = event;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.handleFetchPost(this.pageIndex + 1, this.pageSize)
  }

  handleClickAdd() {
    this.router.navigate(['create'], { relativeTo: this.route })
  }

  handleClickDetail(id: number) {
    this.router.navigate([id], { relativeTo: this.route })
  }

  handleOpenDialog(enterAnimationDuration: string, exitAnimationDuration: string, element: string): void {
    const dialogRef = this.dialog.open(ModalRemoveDialogComponent, {
      data: {
        name: element,
      },
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.name && result.isYes) {
        this.postService.remove(Number(element)).subscribe()
      }
    });
  }

  handleFetchPost(page = 0, limit = 10) {
    const params = { page, limit }
    this.postService.get(params).subscribe((result: Post[]) => {
      this.displayedData = result?.map((item: Post) => {
        item.body = toTruncate(item.body, 100)
        return item
      })
    })
  }

  handleFetchPostCount() {
    this.postService.get().subscribe((result: Post[]) => {
      this.length = result?.length || 0
    })
  }
  
  ngOnInit() {
    this.displayedColumns = ['id', 'userId', 'title', 'actions']
    this.handleFetchPost()
    this.handleFetchPostCount() 
  }
}
