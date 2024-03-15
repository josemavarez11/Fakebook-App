import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { Storage} from '@angular/fire/storage';
import { ModalComponent } from '../../others/modal/modal.component';
import { SwitchService } from 'src/services/switch.service';
import { GetResult, Preferences } from '@capacitor/preferences';
import { alert } from 'src/app/utils/alert';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  standalone: true,
  imports: [CommonModule, ModalComponent]
})
export class PostComponent  implements OnInit {
  likeClicked: boolean;
  favoriteClicked: boolean;
  modalOpen: boolean;
  token: GetResult ;

  @Input() _id: string = '';
  @Input() description:string = '';
  @Input() name: string = '';
  @Input() images: string[] = [];
  @Input() date: string = '';
  @Input() liked: boolean = false;
  @Input() favorited: boolean = false;

  constructor(private storage: Storage, private modalSS: SwitchService) {
    this.images = [];
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

  async handleFavoriteClick() {
    if(this.favorited) {
      console.log('el post es favorito, hay que quitarle el favorito')
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
      console.log('el post no es favorito, hay que ponerle el favorito');
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

  async handleLikeClick() {
    if(this.liked) {
      console.log('el post esta likeado, hay que quitarle el like')
      try {
        const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/likes/dislike', {

        });
        if(response.status !== 200) return alert('Error!', 'Server error removing like', ['OK']);
        return this.liked = !this.liked;
      } catch (error) {
        return alert('Error!', 'Unable to remove like', ['OK']);
      }
    } else {
      console.log('el post no esta likeado, hay que ponerle el like')
      try {
        const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/likes/like', {

        });
        if(response.status !== 201) return alert('Error!', 'Server error adding like', ['OK']);
        return this.liked = !this.liked;
      } catch (error) {
        return alert('Error!', 'Unable to add like', ['OK']);
      }
    }
  }

  onFavoriteClick() {
    this.favoriteClicked = !this.favoriteClicked;
  }
}
