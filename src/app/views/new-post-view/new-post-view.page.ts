import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink, Router } from '@angular/router';
import { alert } from 'src/app/utils/alert';
import { GetResult, Preferences } from '@capacitor/preferences';
import { Storage, ref, uploadBytes, listAll, getDownloadURL } from '@angular/fire/storage'

@Component({
  selector: 'app-new-post-view',
  templateUrl: './new-post-view.page.html',
  styleUrls: ['./new-post-view.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})

export class NewPostViewPage implements OnInit {
  token: GetResult ;
  images: string[];
  textInput: string;
  characters: any;
  countImg: number;
  accordionOpen: boolean;

  constructor(private storage: Storage, private router: Router) {
    this.token = { value: '' };
    this.textInput = '';
    this.characters = '';
    this.images = [];
    this.countImg = 0;
    this.accordionOpen = false;
  }

  async ngOnInit() {
    this.token = await Preferences.get({ key: 'token' });
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

  countCharacters(){
    this.characters = this.textInput.length;
  }

  toggleAccordion() {
    this.accordionOpen = !this.accordionOpen;
  }

  async createPost() {

    if(this.textInput.length === 0 || this.images.length === 0) {
      return alert('Oops!', 'Please write something or upload an image to create a post', ['OK']);
    }

    try {
      const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token.value}`
        },
        body: JSON.stringify({body: this.textInput, images: this.images})
      });

      if(response.status !== 201) return alert('Oops!', 'Server error creating your post', ['OK']);

      return this.router.navigate(['/feed']);
    } catch (error) {
      return alert('Error!', 'Unable to create your post', ['OK']);
    }
  }
}
