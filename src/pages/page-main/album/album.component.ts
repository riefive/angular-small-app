import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AlbumService } from 'src/services/album.service';
import { Album } from 'src/types/album.type';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  public displayedColumns: string[] = []
  public displayedData: Album[] = []
  public length = 0;
  public pageIndex = 0;
  public pageSize = 10;
  public pageSizeOptions = [5, 10, 25, 50];
  pageEvent: any;

  constructor(private albumService: AlbumService) { }

  handlePageEvent(event: PageEvent) {
    this.pageEvent = event;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.handleFetchAlbum(this.pageIndex + 1, this.pageSize)
  }

  handleFetchAlbum(page = 0, limit = 10) {
    const params = { page, limit }
    this.albumService.get(params).subscribe((result: Album[]) => {
      this.displayedData = result
    })
  }

  handleFetchAlbumCount() {
    this.albumService.get().subscribe((result: Album[]) => {
      this.length = result?.length || 0
    })
  }

  ngOnInit() {
    this.displayedColumns = ['title']
    this.handleFetchAlbum()
    this.handleFetchAlbumCount()
  }
}
