/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';

fdescribe('Service: ServiceUser', () => {
  let srvUser: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports:[
        HttpClientModule
      ]
    });
  });

  beforeEach(inject([UserService], (srvUserInject: UserService) => {
    srvUser = srvUserInject;
  }));

  it('should able to created', () => {
    expect(srvUser).toBeTruthy();
  });

  it('User service can get list', (done: DoneFn) => { 
    srvUser.get().subscribe(result => {
      expect(result).not.toBeNull();
      done();
    });
  });

  it('User service can get list with filters', (done: DoneFn) => { 
    srvUser.get({
      page: 1,
      limit: 10,
    }).subscribe(result => {
      expect(result.length).toEqual(10);
      expect(result[0].id).toBeGreaterThan(0);
      done();
    });
  });

  it('User service login hardcode', (done: DoneFn) => { 
    const mockUser = { user: 'admin', password: 'admin' }
    srvUser.login(mockUser.user, mockUser.password).subscribe(result => {
      expect(result.status).toBeTrue()
      done();
    });
  });

  it('User service login with jwt', (done: DoneFn) => { 
    const mockUser = { user: 'john@mail.com', password: 'changeme' }
    srvUser.loginJwt(mockUser.user, mockUser.password).subscribe({
      next: (res) => {
        srvUser.afterSuccessLogin(mockUser.user, res, false);
        const isLogin = srvUser.isLoggedIn()
        expect(isLogin).toBeTrue()
        done();
      },
      error: (err) => {
        srvUser.afterFailedLogin(err);
        done()
      },
    })
  });

  it('User service after success login', (done: DoneFn) => {
    const mockUser = { user: 'john@mail.com' }
    const object = { access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsI…zg0fQ.rPnp198XS5kVWZtqhRPu0f2czCKlkQSjuyZ2sD3yR_E'} 
    const isLogin = srvUser.afterSuccessLogin(mockUser.user, object, false)
    expect(isLogin).toBeTrue()
    done()
  })

  it('User service after failed login', (done: DoneFn) => {
    const isFailed = srvUser.afterFailedLogin(new Error(JSON.stringify({ status: 400, message: 'Error not found' })))
    expect(isFailed).toBeTrue()
    done()
  })

  it('User service logout', (done: DoneFn) => {
    srvUser.clear()
    const isLogin = srvUser.isLoggedIn()
    expect(isLogin).toBeFalse()
    done()
  })
});
