/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { PhotoService } from './photo.service';
import { HttpClientModule } from '@angular/common/http';

fdescribe('Service: Photo', () => {
  let srvPhoto: PhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhotoService],
      imports:[
        HttpClientModule
      ]
    });
  });

  beforeEach(inject([PhotoService], (srvPhotoInject: PhotoService) => {
    srvPhoto = srvPhotoInject;
  }));

  it('should able to created', () => {
    expect(srvPhoto).toBeTruthy();
  });

  it('Photo service can get list', (done: DoneFn) => { 
    srvPhoto.get().subscribe(result => {
      expect(result).not.toBeNull();
      done();
    });
  });

  it('Photo service can get list with filters', (done: DoneFn) => { 
    srvPhoto.get({
      page: 1,
      limit: 10,
    }).subscribe(result => {
      expect(result.length).toEqual(10);
      expect(result[0].id).toBeGreaterThan(0);
      done();
    });
  });
});
