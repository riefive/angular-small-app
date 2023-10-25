import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CommentService } from 'src/services/comment.service';
import { Comment } from 'src/types/comment.type';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  public displayedColumns: string[] = []
  public displayedData: Comment[] = []
  public length = 0;
  public pageIndex = 0;
  public pageSize = 10;
  public pageSizeOptions = [5, 10, 25, 50];
  pageEvent: any;

  constructor(private commonService: CommentService) { }

  handlePageEvent(event: PageEvent) {
    this.pageEvent = event;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.handleFetchComment(this.pageIndex + 1, this.pageSize)
  }

  handleFetchComment(page = 0, limit = 10) {
    const params = { page, limit }
    this.commonService.get(params).subscribe((result: Comment[]) => {
      this.displayedData = result
    })
  }

  handleFetchCommentCount() {
    this.commonService.get().subscribe((result: Comment[]) => {
      this.length = result?.length || 0
    })
  }

  ngOnInit() {
    this.displayedColumns = ['name', 'email', 'body']
    this.handleFetchComment()
    this.handleFetchCommentCount()
  }
}
