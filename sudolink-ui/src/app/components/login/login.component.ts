import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  constructor(
    private authService: AuthService
  ) { }


  ngOnInit(): void {
  }

  onLogin(){
    console.log({Login: 'login....'})
    this.setLoading();

    const user = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    }
    this.authService.login(user);
  }

  getLoaderStatus() {
    return this.authService.load;
  }

  setLoading() {
    this.authService.load = 'inline-block';
  }


}
