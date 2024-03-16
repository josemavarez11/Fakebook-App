import { Component, Input, OnInit } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { alert } from 'src/app/utils/alert';
import { GetResult, Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-input-comments',
  templateUrl: './input-comments.component.html',
  styleUrls: ['./input-comments.component.scss'],
  standalone: true
})
export class InputCommentsComponent  implements OnInit {
  @Input() postId: string = '';

  commentInputValue: String = '';
  token: GetResult ;
  images: string[] = [];

  constructor(private storage: Storage) {
    this.token = { value: '' };
  }

  async ngOnInit() {
    this.token = await Preferences.get({ key: 'token' });
  }

  handleCommentInputChange(event: any) {
    this.commentInputValue = event.target.value;
  }

  async uploadImage(event: any){
    const file = event.target.files[0];
    const imgRef = ref(this.storage, `images/${file.name}`);

    try {
      await uploadBytes(imgRef, file);
    } catch (error) {
      return alert('Error', 'Something went wrong uploading your image', ['Try Again']);
    }

    return this.images.push(await getDownloadURL(imgRef));
  }

  async sendComment(){
    try {
      const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/comments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token.value}`
        },
        body: JSON.stringify({
          postId: this.postId,
          body: this.commentInputValue,
          images: this.images,
        })
      });

      if(response.status !== 201) return alert('Oops', 'Server error trying to send your comment', ['Ok']);

      return;
    } catch (error) {
      return alert('Error', 'Unable to send your comment', ['Try Again'])
    }
  }
}
