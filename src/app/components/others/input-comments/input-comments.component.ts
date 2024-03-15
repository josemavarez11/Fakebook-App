import { Component, OnInit } from '@angular/core';
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

  // uploadImage(event: any){
  //   const file = event.target.files[0];

  //   const imgRef = ref(this.storage, `images/${file.name}`);

  //   uploadBytes(imgRef, file)
  //   .then(response => console.log(response))
  //   .catch(error => console.log(error));
  // }

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
    console.log(this.commentInputValue);
    console.log(this.images);
  }
}
