import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLinkActive, RouterLink]
})
export class NavBarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
