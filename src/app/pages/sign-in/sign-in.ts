import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  imports: [RouterLink],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn {
  readonly email = signal('');
  readonly password = signal('');

  constructor(public auth: AuthService) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.auth.login(this.email(), this.password());
  }
}
