import { Component, Input, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SwitchService } from 'src/services/switch.service';
import { InputCommentsComponent } from '../input-comments/input-comments.component';
import { GetResult, Preferences } from '@capacitor/preferences';
import { alert } from 'src/app/utils/alert';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLink, InputCommentsComponent, NgFor]
})
export class ModalComponent  implements OnInit {
  likeClicked = false;
  token: GetResult;
  comments: any[] = [];

  constructor(private modalSS: SwitchService) {
    this.token = { value: '' };
  }

  @Input() _id: string = '';

  async ngOnInit() {
    this.token = await Preferences.get({ key: 'token'});
    this.getComments();
  }

  closeModal(){
    this.modalSS.$modal.emit(false);
  }

  onLikeClick() {
    this.likeClicked = !this.likeClicked;
    // this.favoeiteClicked = false;
  }

  async getComments() {
    try {
      const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/comments/getAll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token.value}`
        },
        body: JSON.stringify({ postId: this._id })
      });

      if(response.status !== 200) return alert('Error!', 'Server error getting comments', ['OK']);

      const data = await response.json();
      return this.comments = data.formattedComments;
    } catch (error) {
      return alert('Error!', 'Unable to get comments', ['OK']);
    }
  }

}
