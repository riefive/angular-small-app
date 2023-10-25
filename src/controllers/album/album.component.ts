import { Component, OnInit } from '@angular/core';
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

  constructor(private albumService: AlbumService) { }

  ngOnInit() {
    this.displayedColumns = ['title']
    this.albumService.get().subscribe((result: Album[]) => {
      this.displayedData = result
    })
  }
}
