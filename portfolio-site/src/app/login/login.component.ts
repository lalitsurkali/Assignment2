import { Component } from '@angular/core';
import { UserService } from '../app-services/user.service';
import { User } from '../interfaces/user.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';

  constructor(private _userService: UserService, private _router: Router) { }

  public OnClickLoginButton() {
    const user: User = this.getUser();
    this.login(user);
  }

  private login(user: User) {
    this._userService.Login(user)
    .subscribe({
      next: () => {
        this._router.navigate(['./businessContact']);
      },
      error: (err) => {
        console.error(err);
       
      }
    });

  }

  private getUser(): User {
    return {
      firstName: '',
      lastName: '',
      email: this.email,
      password: this.password,
      token: ''
    }
  }

  

}