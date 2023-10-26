import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  private subs: any[]= [];

  constructor(private fb: FormBuilder, private userSrv: UserService) {
    this.form = this.fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });  
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
  
  OnLogin()
  {
    let sub = this.userSrv.login(this.form.value?.username, this.form.value?.password).subscribe(r => {
      alert("Berhasil Login");
    });

    this.subs.push(sub);
  }

}
