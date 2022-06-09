import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable, Observer, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public load = 'none';
  // resp$?: any;
  constructor(
    private http: HttpClient,
    private toast: ToastrService,
    private route: Router
  ) { }

  register(user: any) {
    this.http.post<any>('http://localhost:3000/auth/register', user)
      .subscribe(
        user =>  {
          console.log(`User created: \n${JSON.stringify(user, null, 3)}`);
          this.toast.success('Registration', 'Success!!!');
          this.route.navigate(['/login']);
        },
        err => {
          console.log(`Registration failed!!!: \n${JSON.stringify(err, null, 3)}`);
          this.toast.error(JSON.stringify(err, null, 2), 'Registration failed');
          this.load = 'none';
        }
      )
  }

  login(user: any) {
    this.http.post<any>('http://localhost:3000/auth/login', user)
      .subscribe(
        user =>  {
          console.log(`Login success: \n${JSON.stringify(user, null, 3)}`);
          this.toast.success('Login', 'Success!!!');
          this.route.navigate(['/home', `${user.username}`]);
          
          this.load = 'none';
        },
        err => {
          console.log(`Login failed!!!: \n${JSON.stringify(err, null, 3)}`);
          this.toast.error(JSON.stringify(err, null, 2), 'Login failed');
          this.load = 'none';
        }
      )
  }
}
