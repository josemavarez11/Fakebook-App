import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink, Router } from '@angular/router';
import { Storage } from '@angular/fire/storage';
import { alert } from 'src/app/utils/alert';
import { GetResult, Preferences } from '@capacitor/preferences';
import { MyPostComponent } from 'src/app/components/containers/my-post/my-post.component';

@Component({
  selector: 'app-user-profile-view',
  templateUrl: './user-profile-view.page.html',
  styleUrls: ['./user-profile-view.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, MyPostComponent],
})
export class UserProfileViewPage implements OnInit {
  images: string[];
  token: GetResult;
  userName: string;
  myPosts: any[] = [];

  constructor(private storage: Storage) {
    this.images = [];
    this.token = { value: '' };
    this.userName = "";
  }

  async ngOnInit() {
    this.token = await Preferences.get({ key : 'token' });
    this.getNameAndEmail();
    this.getAllPosts();
  }

  async getAllPosts() {
    try {
      const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/posts/getAll', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${this.token.value}` }
      });

      if(response.status !== 200) return alert('Error!', 'Server error getting your posts', ['OK']);

      const data = await response.json();

      return this.myPosts = data.posts;
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

  handleFavoriteClick() {
    console.log('Favorite clicked');
    //enviar al usuario a la vista favorite-posts view
  }
}
