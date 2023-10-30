/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from './todo.service';

fdescribe('Service: Todo', () => {
  let srvTodo: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService],
      imports: [
        HttpClientModule
      ]
    });
  });

  beforeEach(inject([TodoService], (srvTodoInject: TodoService) => {
    srvTodo = srvTodoInject;
  }));

  it('should able to created', () => {
    expect(srvTodo).toBeTruthy();
  });

  it('Post service can get list', (done: DoneFn) => { 
    srvTodo.get().subscribe(result => {
      expect(result).not.toBeNull();
      done();
    });
  });

  it('Service can get list with filters', (done: DoneFn) => { 
    srvTodo.get({
      page: 1,
      limit: 10,
    }).subscribe(result => {
      expect(result.length).toEqual(10);
      expect(result[0].id).toBeGreaterThan(0);
      done();
    });
  });

  it('Todo service can get one', (done: DoneFn) => { 
    srvTodo.getOne(1).subscribe(result => {
      expect(result.id).toEqual(1);
      done();
    });
  });

  it('Service insert', (done: DoneFn) => { 
    srvTodo.insert({ id: 1, userId: 1, title: 'Lorem ipsum', body: 'Lorem Ipsum' }).subscribe((result) => {
      expect(result.id).toEqual(101);
      done()
    })
  });

  it('Service update', (done: DoneFn) => { 
    srvTodo.update(1, { id: 1, userId: 1, title: 'Lorem ipsum', body: 'Lorem Ipsum' }).subscribe((result) => {
      expect(result.id).toEqual(1);
      done()
    })
  });

  it('Service remove', (done: DoneFn) => { 
    srvTodo.remove(1).subscribe((result: any) => {
      expect(result).toEqual({});
      done()
    })
  });
});
