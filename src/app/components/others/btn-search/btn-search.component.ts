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
    return this.router.navigate(['/user-profile-friend'], { queryParams: { id: this.user._id } });
  }
}

