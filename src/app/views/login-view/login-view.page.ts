import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, IonIcon } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { alert } from 'src/app/utils/alert';
import { Preferences } from '@capacitor/preferences';
import { __values } from 'tslib';

@Component({
  selector: 'app-login',
  templateUrl: './login-view.page.html',
  styleUrls: ['./login-view.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class LoginPage implements OnInit {
  emailInputValue: String;
  passwordInputValue: String;

  constructor(private router: Router, public alertCtrl: AlertController) {
    this.emailInputValue = '';
    this.passwordInputValue = '';
  }

  //aplicar validación de inputs
  ngOnInit() {

  }

  ionViewWillEnter() {
    this.clearInputs();
  }

  clearInputs() {
    this.emailInputValue = '';
    this.passwordInputValue = '';
  }

  clearEmailInput() {
    this.emailInputValue = '';
  }

  clearPasswordInput() {
    this.passwordInputValue = '';
  }

  handleEmailInputChange(event: any) {
    this.emailInputValue = event.target.value;
  }

  handlePasswordInputChange(event: any) {
    this.passwordInputValue = event.target.value;
  }

  async handleLoginClick() {
    if(this.emailInputValue === '' || this.passwordInputValue === '') {
      return alert('Oops!', 'Email and password are required', ['Try Again']);
    }

    try {
      const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: this.emailInputValue,
          password: this.passwordInputValue
        })
      });

      if(response.status === 404) return alert('Oops!', 'User not found', ['Try Again']);

      if(response.status === 401) return alert('Oops!', 'Email or password is incorrect', ['Try Again']);

      if(
        response.status !== 401 &&
        response.status !== 404 &&
        response.status !== 200
      ) return alert('Error!', 'Unknown error in server', ['OK']);

      const data = await response.json();
      await Preferences.set({ key: 'token', value: data.token });
      this.router.navigate(['/feed']);
    } catch (error) {
      return alert('Error!', 'Something went wrong while trying to login', ['OK']);
    }
  }
}
