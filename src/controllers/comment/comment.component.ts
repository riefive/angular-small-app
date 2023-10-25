import { Component, OnInit } from '@angular/core';
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

  constructor(private commonService: CommentService) { }

  ngOnInit() {
    this.displayedColumns = ['name', 'email', 'body']
    this.commonService.get().subscribe((result: Comment[]) => {
      this.displayedData = result
    })
  }
}
