import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { toTruncate } from "src/helpers/helper.string";
import { PostService } from 'src/services/post.service';
import { Post } from 'src/types/post.type';

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

  constructor(private postService: PostService) { }

  handlePageEvent(event: PageEvent) {
    this.pageEvent = event;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.handleFetchPost(this.pageIndex + 1, this.pageSize)
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
    this.displayedColumns = ['title', 'body']
    this.handleFetchPost()
    this.handleFetchPostCount() 
  }
}
