/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from './post.service';

fdescribe('Service: Post', () => {
  let srvPost: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostService],
      imports: [
        HttpClientModule
      ]
    });
  });

  beforeEach(inject([PostService], (srvPostInject: PostService) => {
    srvPost = srvPostInject;
  }));

  it('should able to created', () => {
    expect(srvPost).toBeTruthy();
  });

  it('Post service can get list', (done: DoneFn) => { 
    srvPost.get().subscribe(result => {
      expect(result).not.toBeNull();
      done();
    });
  });

  it('Service can get list with filters', (done: DoneFn) => { 
    srvPost.get({
      page: 1,
      limit: 10,
    }).subscribe(result => {
      expect(result.length).toEqual(10);
      expect(result[0].id).toBeGreaterThan(0);
      done();
    });
  });

  it('Post service can get one', (done: DoneFn) => { 
    srvPost.getOne(1).subscribe(result => {
      expect(result.id).toEqual(1);
      done();
    });
  });

  it('Service insert', (done: DoneFn) => { 
    srvPost.insert({ id: 1, userId: 1, title: 'Lorem ipsum', body: 'Lorem Ipsum' }).subscribe((result) => {
      expect(result.id).toEqual(101);
      done()
    })
  });

  it('Service update', (done: DoneFn) => { 
    srvPost.update(1, { id: 1, userId: 1, title: 'Lorem ipsum', body: 'Lorem Ipsum' }).subscribe((result) => {
      expect(result.id).toEqual(1);
      done()
    })
  });

  it('Service remove', (done: DoneFn) => { 
    srvPost.remove(1).subscribe((result: any) => {
      expect(result).toEqual({});
      done()
    })
  });
});
