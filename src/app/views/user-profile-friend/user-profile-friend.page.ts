import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { Storage, ref } from '@angular/fire/storage';
import { listAll, getDownloadURL } from '@firebase/storage';
import { alert } from 'src/app/utils/alert';
import { GetResult, Preferences } from '@capacitor/preferences';
import { AddFriendComponent } from 'src/app/components/others/add-friend/add-friend.component';
import { RemoveFriendComponent } from 'src/app/components/others/remove-friend/remove-friend.component';

@Component({
  selector: 'app-user-profile-friend',
  templateUrl: './user-profile-friend.page.html',
  styleUrls: ['./user-profile-friend.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, AddFriendComponent, RemoveFriendComponent]
})
export class UserProfileFriendPage implements OnInit {
  images: string[];
  token: GetResult;
  userName: string;

  constructor(private storage: Storage) { 
    this.images = [];
    this.token = { value: '' };
    this.userName = "";
   }

  async ngOnInit() {
    this.token = await Preferences.get({ key : 'token' });
    this.getNameAndEmail();
    this.getImages();
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

      if(data.length === 0){
        //render a message like "It seems like you haven't posted anything yet."
        console.log('No posts');
      }

      return console.log("user posts: ", data.posts);
    } catch (error) {
      return alert('Error!', 'Unable to get your posts', ['OK']);
    }
  }

  getImages(){
    const imgRef = ref(this.storage, 'images');

    listAll(imgRef)
    .then(async response => {
        console.log(response);
        this.images = [];
        for(let item of response.items){
          const url = await getDownloadURL(item)
          this.images.push(url);
          // console.log(url);
        }
    })
    .catch(error => console.log(error));
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

  handlePencilClick() {
    alert("Edit Post", "This feature is not available yet", ["OK"]);
  }

  handleTrashClick() {
    alert("Delete Post", "This feature is not available yet", ["OK"]);
  }

  handleExploreCommentsClick() {
    alert("Explore Comments", "This feature is not available yet", ["OK"]);
  }

}
