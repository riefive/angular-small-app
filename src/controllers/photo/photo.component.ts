import { Component, OnInit } from '@angular/core';
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

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.displayedColumns = ['title']
    this.photoService.get().subscribe((result: Photo[]) => {
      this.displayedData = result
    })
  }
}

