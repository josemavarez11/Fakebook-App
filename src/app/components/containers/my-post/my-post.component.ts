import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { ModalComponent } from '../../others/modal/modal.component';
import { SwitchService } from 'src/services/switch.service';
import { GetResult, Preferences } from '@capacitor/preferences';
import { alert } from 'src/app/utils/alert';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage'
import { IonModal, IonContent } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.scss'],
  standalone: true,
  imports: [IonContent, IonModal, CommonModule, ModalComponent, FormsModule, IonicModule]
})
export class MyPostComponent  implements OnInit {
  likeClicked: boolean;
  favoriteClicked: boolean;
  modalOpen: boolean;
  token: GetResult ;
  isEditing: boolean = false;
  pencilImage: string = "../../../../assets/pencil-outline.svg";
  showDeleteButton: boolean = false;
  showAddButton: boolean = false;
  countImg: number;
  isOpen: boolean = false;

  @Input() _id: string = '';
  @Input() description: string = '';
  @Input() name: string = '';
  @Input() images: string[] = [];
  @Input() date: string = '';
  @Input() liked: boolean = false;
  @Input() favorited: boolean = false;

  constructor(private storage: Storage, private modalSS: SwitchService, private router: Router) {
    this.likeClicked = false;
    this.favoriteClicked = false;
    this.modalOpen = false;
    this.token = { value: '' };
    this.countImg = 0;
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

  handleDescriptionInputChange(event: any) {
    this.description = event.target.value;
  }

  async confirmEditClick() {
    try {
      const responseDesc = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/posts/updateBody', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token.value}`,
        },
        body: JSON.stringify({ postId: this._id, newBody: this.description })
      });

      const responseImg = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/posts/updateImages', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token.value}`,
        },
        body: JSON.stringify({ postId: this._id, newImages: this.images })
      });

      if(responseDesc.status !== 200 || responseImg.status !== 200) return alert('Error!', 'Server error editing post', ['OK']);

      return this.onEditClick();
    } catch (error) {
      return alert ('Error!', 'Unable to edit post', ['OK']);
    }
  }

  onEditClick(){
    if(this.isEditing){
      this.isEditing = false;
      this.pencilImage = "../../../../assets/pencil-outline.svg";
      this.showDeleteButton = false;
      this.showAddButton = false;
    } else{
      this.isEditing = true
      this.pencilImage = "../../../../assets/checkmark-outline.svg";
      this.showDeleteButton = true;
      this.showAddButton = true;
    }
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

  async uploadImage(event: any){
    const file = event.target.files[0];
    const imgRef = ref(this.storage, `images/${file.name}`);

    try {
      await uploadBytes(imgRef, file);
    } catch (error) {
      return alert('Error', 'Something went wrong uploading your image', ['Try Again']);
    }

    this.images.push(await getDownloadURL(imgRef));
    return this.countImg = this.images.length;
  }

  async delete() {
    this.isOpen = true;
  }

  cancelDeleteClick(){
    console.log('cancel');
    this.isOpen = false;
  }

  async confirmDeleteClick(){
    try {
      const response = await fetch(`https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/posts/delete/${this._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${this.token.value}` }
      });

      if(response.status !== 200) return alert('Error!', 'Server error deleting post', ['OK']);

      return this.isOpen = false;
    } catch (error) {
      return alert('Error!', 'Unable to delete post', ['OK']);
    }
  }

}
