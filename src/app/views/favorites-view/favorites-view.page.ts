import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { MyPostComponent } from 'src/app/components/containers/my-post/my-post.component';
import { PostComponent } from 'src/app/components/containers/post/post.component';
import { alert } from 'src/app/utils/alert';
import { GetResult, Preferences } from '@capacitor/preferences';
import { Storage } from '@angular/fire/storage';

@Component({
  selector: 'app-favorites-view',
  templateUrl: './favorites-view.page.html',
  styleUrls: ['./favorites-view.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, MyPostComponent, PostComponent]
})
export class FavoritesViewPage implements OnInit {
  images: string[];
  token: GetResult;
  userName: string;
  favPosts: any[] = [];

  constructor(private storage: Storage) {
    this.images = [];
    this.token = { value: '' };
    this.userName = "";
   }

  async ngOnInit() {
    this.token = await Preferences.get({ key : 'token' });
    this.getNameAndEmail();
    this.getFavoritePosts();
  }

  async getFavoritePosts() {
    try {
      const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/posts/getFavorites', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${this.token.value}` }
      });

      if(response.status !== 200) return alert('Error!', 'Server error getting your posts', ['OK']);

      const data = await response.json();

      return this.favPosts = data.posts;
    } catch (error) {
      return alert('Error!', 'Unable to get your posts', ['OK']);
    }
  }

  async getNameAndEmail() {
    try {
      const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/users/getNameAndEmail', {
        method: 'GET',
        headers: { "Authorization": `Bearer ${this.token.value}` }
      });

      if(response.status !== 200) return alert("Oops", "Something went wrong trying to get user email and name", ["OK"]);

      const data = await response.json();
      this.userName = data.name;
    } catch (error) {
      return alert("Oops", "Something went wrong trying to get user email and name", ["OK"]);
    }
  }
}

