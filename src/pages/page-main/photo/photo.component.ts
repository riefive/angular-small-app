import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PhotoService } from 'src/services/photo.service';
import { Photo } from 'src/types/photo.type';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  public displayedColumns: string[] = []
  public displayedData: Photo[] = []
  public length = 0;
  public pageIndex = 0;
  public pageSize = 10;
  public pageSizeOptions = [5, 10, 25, 50];
  pageEvent: any;

  constructor(private photoService: PhotoService) { }

  handlePageEvent(event: PageEvent) {
    this.pageEvent = event;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.handleFetchPhoto(this.pageIndex + 1, this.pageSize)
  }

  handlePhotoClick(url: string) {
    window.open(url)
  }

  handleFetchPhoto(page = 0, limit = 10) {
    const params = { page, limit }
    this.photoService.get(params).subscribe((result: Photo[]) => {
      this.displayedData = result
    })
  }

  handleFetchPhotoCount() {
    this.photoService.get().subscribe((result: Photo[]) => {
      this.length = result?.length || 0
    })
  }

  ngOnInit() {
    this.displayedColumns = ['title', 'thumbnailUrl']
    this.handleFetchPhoto()
    this.handleFetchPhotoCount()
  }
}

