import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  async googleClick() {
    //this.authService.GoogleAuth();

    try {
      await this.authService.googleLogin();
      //this.router.navigateByUrl('/main');
    } catch (error) {
      console.error('Google Sign-In error:', error);
    }

  }

  async onGoogleSignIn(): Promise<void> {
    try {
      await this.authService.googleLogin();
      //this.router.navigateByUrl('/main');
    } catch (error) {
      console.error('Google Sign-In error:', error);
    }
  }
}
