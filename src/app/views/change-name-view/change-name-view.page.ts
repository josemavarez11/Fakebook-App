import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink, Router } from '@angular/router';
import { alert } from 'src/app/utils/alert';
import { GetResult, Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-change-name-view',
  templateUrl: './change-name-view.page.html',
  styleUrls: ['./change-name-view.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class ChangeNameViewPage implements OnInit {
  nameInputValue: String;
  token: GetResult;

  constructor(private router: Router) {
    this.nameInputValue = '';
    this.token = { value: '' };
   }

  async ngOnInit() {
    this.token = await Preferences.get({ key : 'token' });
  }

  handleNameChange(event: any) {
    this.nameInputValue = event.target.value;
  }

  async handleConfirmClick() {
    if(this.nameInputValue === '') return alert('Oops!', 'New name is required', ['Try Again']);

    try {
      const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/users/updateName', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token.value}`
        },
        body: JSON.stringify({ newName: this.nameInputValue })
      });

      if(response.status !== 200) return alert('Error!', 'Unknown error in server', ['OK']);

      alert('Success!', 'Name has been changed successfully', ['Continue']);
      return this.router.navigate(['/user-settings']);
    } catch (error) {
      return alert('Error!', 'Something went wrong while trying to change name', ['OK']);
    }
  }

}
