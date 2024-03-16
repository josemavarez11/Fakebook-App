import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Storage} from '@angular/fire/storage';
import { ModalComponent } from '../../others/modal/modal.component';
import { SwitchService } from 'src/services/switch.service';
import { GetResult, Preferences } from '@capacitor/preferences';
import { alert } from 'src/app/utils/alert';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.scss'],
  standalone: true,
  imports: [CommonModule, ModalComponent]
})
export class MyPostComponent  implements OnInit {
  likeClicked: boolean;
  favoriteClicked: boolean;
  modalOpen: boolean;
  token: GetResult ;

  @Input() _id: string = '';
  @Input() description: string = '';
  @Input() name: string = '';
  @Input() images: string[] = [];
  @Input() date: string = '';
  @Input() liked: boolean = false;
  @Input() favorited: boolean = false;

  constructor(private storage: Storage, private modalSS: SwitchService) {
    this.likeClicked = false;
    this.favoriteClicked = false;
    this.modalOpen = false;
    this.token = { value: '' };
  }


  async ngOnInit() {
    this.token = await Preferences.get({ key: 'token' });
    this.modalSS.$modal.subscribe((value)=>{this.modalOpen = value});
  }

  modalOpenHandler() {
    this.modalOpen = true;
  }

  onFavoriteClick() {
    this.favoriteClicked = !this.favoriteClicked;
  }

  onDeleteClick() {
    console.log('delete');
  }

  onEditClick(){
    console.log('edit');
  }

  async likeClick(){
    const likeIcon = document.getElementById('Glyph');

    if(this.liked){
      if(likeIcon) likeIcon.style.fill = '#d5cbd9';
      console.log(`vamos a quitarle el like al targetId: ${this._id}`)
      try {
        const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/likes/dislike', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token.value}`,
          },
          body: JSON.stringify({ targetId: this._id })
        });

        if(response.status !== 200) return alert('Error!', 'Server error removing like', ['OK']);

        return this.liked = !this.liked;
      } catch (error) {
        return alert('Error!', 'Unable to remove like', ['OK']);
      }
    } else {
      if(likeIcon) likeIcon.style.fill = '#4D2959';
      console.log(`vamos a darle like al targetId: ${this._id}`)
      try {
        const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/likes/like', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token.value}`,
          },
          body: JSON.stringify({ targetId: this._id })
        });

        if(response.status !== 201) return alert('Error!', 'Server error adding like', ['OK']);

        return this.liked = !this.liked;
      } catch (error) {
        return alert('Error!', 'Unable to add like', ['OK']);
      }
    }
  }

  async favClick(){
    const favIcon = document.getElementById('Layer_1');
    if(this.favorited) {
      if(favIcon) favIcon.style.fill = '#d5cbd9';
      console.log(`vamos a quitarle el favorito al post: ${this._id}`);
      try {
        const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/favorites/remove', {
          method: 'DELETE',
           headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token.value}`
          },
          body: JSON.stringify({ postId: this._id })
        });

        if(response.status !== 200) return alert('Error!', 'Server error removing favorite', ['OK']);

        return this.favorited = !this.favorited;
      } catch (error) {
        return alert('Error!', 'Unable to remove favorite', ['OK']);
      }
    } else {
      console.log(`vamos a darle favorito al post: ${this._id}`);
      if(favIcon) favIcon.style.fill = '#4D2959';
      try {
        const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/favorites/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token.value}`
          },
          body: JSON.stringify({ postId: this._id })
        });

        if(response.status !== 201) return alert('Error!', 'Server error adding favorite', ['OK']);

        return this.favorited = !this.favorited;
      } catch (error) {
        return alert('Error!', 'Unable to add favorite', ['OK']);
      }
    }
  }

}
