/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { CommentService } from './comment.service';
import { HttpClientModule } from '@angular/common/http';

fdescribe('Service: Comment', () => {
  let srvComment: CommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentService],
      imports:[
        HttpClientModule
      ]
    });
  });

  beforeEach(inject([CommentService], (srvCommentInject: CommentService) => {
    srvComment = srvCommentInject;
  }));

  it('should able to created', () => {
    expect(srvComment).toBeTruthy();
  });

  it('Comment service can get list', (done: DoneFn) => { 
    srvComment.get().subscribe(result => {
      expect(result).not.toBeNull();
      done();
    });
  });

  it('Comment service can get list with filters', (done: DoneFn) => { 
    srvComment.get({
      page: 1,
      limit: 10,
    }).subscribe(result => {
      expect(result.length).toEqual(10);
      expect(result[0].id).toBeGreaterThan(0);
      done();
    });
  });
});
