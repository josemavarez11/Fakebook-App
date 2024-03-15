import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink, Router } from '@angular/router';
import { alert } from 'src/app/utils/alert';
import { GetResult, Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-delete-account-view',
  templateUrl: './delete-account-view.page.html',
  styleUrls: ['./delete-account-view.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class DeleteAccountViewPage implements OnInit {
  token: GetResult

  constructor(private router: Router) {
    this.token = { value: '' };
  }

  async ngOnInit() {
    this.token = await Preferences.get({ key : 'token' });
  }

  async handleConfirmClick() {
    try {
      const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/users/delete', {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${this.token.value}` }
      });

      if(response.status !== 200) return alert('Error!', 'Server error while trying to delete your account', ['OK']);

      alert('Good bye!', 'Your account has been deleted successfully', ['OK']);
      this.router.navigate(['/']);
    } catch (error) {
      return alert('Error!', 'Something went wrong while trying to delete your account', ['OK']);
    }
  }

}
