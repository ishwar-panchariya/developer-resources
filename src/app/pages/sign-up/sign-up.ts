import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
})
export class SignUp {
  readonly email = signal('');
  readonly password = signal('');

  constructor(public auth: AuthService) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.auth.register(this.email(), this.password());
  }
}
