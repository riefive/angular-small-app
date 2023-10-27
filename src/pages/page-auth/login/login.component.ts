import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  private subs: any[]= [];

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private builder: FormBuilder, 
    private userService: UserService
  ) {
    this.form = this.builder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });  
  }

  handleLogin() {
    const formValue = this.form.value
    const username = formValue.username
    const pswd = formValue?.password
    this.userService.loginJwt(username, pswd)
    let sub = this.userService.login(username, pswd).subscribe(result => {
      if (result) {
        this.router.navigateByUrl('/post')
      }
    });
    this.subs.push(sub);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => {
      s.unsubscribe();
      s = null;
    });
    this.subs = [];
  }

  ngOnInit() {
  }
}
