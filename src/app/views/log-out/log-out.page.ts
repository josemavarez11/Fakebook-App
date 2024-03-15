import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.page.html',
  styleUrls: ['./log-out.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class LogOutPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  async handleConfirmClick() {
    await Preferences.remove({ key: 'token' });
    this.router.navigate(['login']);
  }

}
