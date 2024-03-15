import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-btn-search',
  templateUrl: './btn-search.component.html',
  styleUrls: ['./btn-search.component.scss'],
  standalone: true
})
export class BtnSearchComponent  implements OnInit {
  @Input() user: any = {};

  constructor() { }

  ngOnInit() {}

  handleUserClick() {
    console.log('User clicked');
  }
}
