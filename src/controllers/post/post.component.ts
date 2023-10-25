import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/services/post.service';
import { Post } from 'src/types/post.type';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  public displayedColumns: string[] = []
  public displayedData: Post[] = []

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.displayedColumns = ['title', 'body']
    this.postService.get().subscribe((result: Post[]) => {
      this.displayedData = result
    })
  }
}
