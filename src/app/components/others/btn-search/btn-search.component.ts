import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { GetResult, Preferences } from '@capacitor/preferences';
import { alert } from 'src/app/utils/alert';

@Component({
  selector: 'app-btn-search',
  templateUrl: './btn-search.component.html',
  styleUrls: ['./btn-search.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class BtnSearchComponent implements OnInit {
  token: GetResult;

  @Input() user: any = {};

  constructor(private router: Router) {
    this.token = { value: '' };
  }

  async ngOnInit() {
    this.token = await Preferences.get({ key : 'token' });
  }

  async handleUserClick() {

    try {
      const response = await fetch(`https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/friends/existFriendship/${this.user._id}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${this.token.value}` }
      });

      if(response.status !== 200) return alert('Error!', 'Server error getting your frienship result', ['OK']);

      const data = await response.json();

      const friendshipExists = data;

      return this.router.navigate(['/user-profile-friend'], { queryParams: {
        id: this.user._id,
        friendshipExists: friendshipExists
      }});
    } catch (error) {
      return alert('Error!', 'Unable to know if you are his/her friend', ['OK']);
    }
  }
}

