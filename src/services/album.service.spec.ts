/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AlbumService } from './album.service';
import { HttpClientModule } from '@angular/common/http';

describe('Service: Album', () => {
  let srv: AlbumService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlbumService],
      imports:[
        HttpClientModule
      ]
    });
  });

  // This is oldways
  beforeEach(inject([AlbumService], (albumSrv: AlbumService) => {
    srv = albumSrv;
  }));

  it('should able to be injected', inject([AlbumService], (service: AlbumService) => {
    expect(service).toBeTruthy();
  }));

  it('Service can get list', (done: DoneFn) => { 
      srv.get().subscribe(d => {
        expect(d).not.toBeNull();
        expect(d[0].id).toBeGreaterThan(0);
        // console.log(d);
        done();
      });
  });

  it('Service can get list with filters', (done: DoneFn) => { 
      srv.get({
        page: 1,
        limit: 10,
      }).subscribe(d => {
        expect(d.length).toEqual(10);
        expect(d[0].id).toBeGreaterThan(0);
        // console.log(d);
        done();
      });
  });
});
