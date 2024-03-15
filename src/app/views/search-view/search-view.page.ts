import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink, Router } from '@angular/router';
import { alert } from 'src/app/utils/alert';
import { GetResult, Preferences } from '@capacitor/preferences';
import { BtnSearchComponent } from 'src/app/components/others/btn-search/btn-search.component';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.page.html',
  styleUrls: ['./search-view.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, BtnSearchComponent] 
})
export class SearchViewPage implements OnInit {
  token: GetResult;
  usersFound: any;
  user: any;

  constructor(private router: Router) {
    this.token = { value: '' };
  }

  async ngOnInit() {
    this.token = await Preferences.get({ key : 'token' });
  }

  handleSearchInputBlur() {
    this.usersFound = [];
  }

  async handleSearchInputChange(event: any) {
    if(event.target.value === '') return;

    try {
      const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/users/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token.value}`
        },
        body: JSON.stringify({ name: event.target.value })
      });

      if(response.status !== 200) return alert('Error!', 'Server error searching for users', ['OK']);

      const data = await response.json();
      this.usersFound = data;
    } catch (error) {
      return alert('Error!', 'An error occurred searching for users', ['OK']);
    }
  }

  handleUserClick() {
    console.log('User clicked');
  }

}

