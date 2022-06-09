import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  loadingDisplay = 'none';

  registerForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    confirm: new FormControl('', [Validators.required, this.confirmPassValidator()])
  });
  constructor(
    private toast: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  getLoaderStatus() {
    return this.authService.load;
  }

  setLoading() {
    this.authService.load = 'inline-block';
  }

  onRegister(){
    this.setLoading();

    const user = {
      username: this.registerForm.get('username')?.value,
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value
    }
    this.authService.register(user);
  }


  confirmPassValidator(){
    return (control: AbstractControl): ValidationErrors | null => {
      const pass = control.parent?.get('password')?.value;
      const forbidden = control?.value !== pass;
      return forbidden ? {forbiddenName: {value: control.value}} : null;
    };

  }


}
