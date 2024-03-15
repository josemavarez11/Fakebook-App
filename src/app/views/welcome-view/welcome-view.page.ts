import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome-view',
  templateUrl: './welcome-view.page.html',
  styleUrls: ['./welcome-view.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class WelcomeViewPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
