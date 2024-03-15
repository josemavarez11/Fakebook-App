import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from 'src/app/components/others/nav-bar/nav-bar.component';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { alert } from 'src/app/utils/alert';
import { personCircleOutline, chevronForwardOutline, chevronBack } from 'ionicons/icons';
import { GetResult, Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-user-settings-view',
  templateUrl: './user-settings-view.page.html',
  styleUrls: ['./user-settings-view.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, NavBarComponent, IonIcon]
})
export class UserSettingsViewPage implements OnInit {

  token: GetResult;
  userName: string;
  userEmail: string;

  constructor() {
    addIcons({ personCircleOutline });
    addIcons({ chevronForwardOutline });
    addIcons({ chevronBack });
    this.token = { value: '' };
    this.userName = "";
    this.userEmail = "";
  }

  async ngOnInit() {
    this.token = await Preferences.get({ key : 'token' });
    this.getNameAndEmail();
  }

  async getNameAndEmail() {
    try {
      const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/users/getNameAndEmail', {
        method: 'GET',
        headers: { "Authorization": `Bearer ${this.token.value}` }
      });

      if(response.status !== 200) return alert("Oops", "Something went wrong trying to get user email and name", ["OK"]);

      const data = await response.json();
      this.userName = data.name;
      this.userEmail = data.email;
    } catch (error) {
      return alert("Oops", "Something went wrong trying to get user email and name", ["OK"]);
    }
  }

}
