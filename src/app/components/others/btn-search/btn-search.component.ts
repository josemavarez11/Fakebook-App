import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-btn-search',
  templateUrl: './btn-search.component.html',
  styleUrls: ['./btn-search.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class BtnSearchComponent implements OnInit {
  @Input() user: any = {};

  constructor() { }

  ngOnInit() {}

  handleUserClick() {
    
  }
}

