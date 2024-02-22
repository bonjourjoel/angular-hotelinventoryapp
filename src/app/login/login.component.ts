import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HoverDirective } from '../hover.directive';
import { EmailValidatorDirective } from '../emailValidator/email-validator.directive';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'hinv-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HoverDirective,
    EmailValidatorDirective,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  role: string = 'Admin';

  constructor(private router: Router, private loginService: LoginService) {}

  login() {
    if (this.loginService.login(this.email, this.password, this.role)) {
      this.router.navigate(['/rooms']);
    }
  }
}
