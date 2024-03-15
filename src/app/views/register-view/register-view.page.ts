import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { alert } from 'src/app/utils/alert';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.page.html',
  styleUrls: ['./register-view.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class RegisterViewPage implements OnInit {
  nameInputValue: String;
  emailInputValue: String;
  passwordInputValue: String;

  constructor(private router: Router) {
    this.nameInputValue = '';
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
    this.nameInputValue = '';
    this.emailInputValue = '';
    this.passwordInputValue = '';
  }

  clearEmailInput() {
    this.emailInputValue = '';
  }

  clearPasswordInput() {
    this.passwordInputValue = '';
  }

  clearNameInput() {
    this.nameInputValue = '';
  }

  handleNameInputChange(event: any) {
    this.nameInputValue = event.target.value;
  }

  handleEmailInputChange(event: any) {
    this.emailInputValue = event.target.value;
  }

  handlePasswordInputChange(event: any) {
    this.passwordInputValue = event.target.value;
  }

  async handleRegisterClick() {
    if(this.nameInputValue === '' || this.emailInputValue === '' || this.passwordInputValue === '') {
      return alert('Oops!', 'Name, email and password are required', ['Try Again']);
    }

    try {
      const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.nameInputValue,
          email: this.emailInputValue,
          password: this.passwordInputValue
        })
      });

      if(response.status !== 201) return alert('Error!', 'Unknown error in server', ['OK']);

      alert('Success!', 'You have been registered successfully', ['Continue']);
      this.router.navigate(['/login']);
    } catch (error) {
      return alert('Error!', 'Something went wrong while trying to register', ['OK']);
    }
  }

}
