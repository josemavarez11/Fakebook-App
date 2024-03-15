import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink, Router } from '@angular/router';
import { alert } from 'src/app/utils/alert';
import { GetResult, Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-change-email-view',
  templateUrl: './change-email-view.page.html',
  styleUrls: ['./change-email-view.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class ChangeEmailViewPage implements OnInit {
  emailInputValue: String;
  token: GetResult;

  constructor(private router: Router) {
    this.emailInputValue = '';
    this.token = { value: '' };
  }

  async ngOnInit() {
    this.token = await Preferences.get({ key : 'token' });
  }

  handleEmailChange(event: any) {
    this.emailInputValue = event.target.value;
  }

  async handleConfirmClick() {
    if(this.emailInputValue === '') return alert('Oops!', 'New email is required', ['Try Again']);

    try {
      const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/users/updateEmail', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token.value}`
        },
        body: JSON.stringify({ newEmail: this.emailInputValue })
      });

      if(response.status !== 200) return alert('Error!', 'Unknown error in server', ['OK']);

      alert('Success!', 'Email has been changed successfully', ['Continue']);
      return this.router.navigate(['/user-settings']);
    } catch (error) {
      return alert('Error!', 'Something went wrong while trying to change email', ['OK']);
    }
  }

}
