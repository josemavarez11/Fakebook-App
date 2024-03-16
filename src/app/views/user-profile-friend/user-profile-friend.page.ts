import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from 'src/app/components/others/modal/modal.component';

@Component({
  selector: 'app-user-profile-friend',
  templateUrl: './user-profile-friend.page.html',
  styleUrls: ['./user-profile-friend.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, AddFriendComponent, RemoveFriendComponent, ModalComponent]
})
export class UserProfileFriendPage implements OnInit {
  images: string[];
  token: GetResult;
  userName: string;
  userPosts: any[] = [];
  frienshipExists: boolean;
  userProfileId: string = '';
  modalOpen: boolean;

  @Input() _id: string = '';

  constructor(private storage: Storage, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
    this.images = [];
    this.token = { value: '' };
    this.userName = "";
    this.frienshipExists = false;
    this.modalOpen = false;
    
  }

  async ngOnInit() {
    this.token = await Preferences.get({ key : 'token' });
    this.route.queryParams.subscribe(params => {
      const paramValue = params['id'];
      this.userProfileId = paramValue;
      const paramValue2 = params['friendshipExists'];
      this.frienshipExists = paramValue2;
      console.log('son amigos?', this.frienshipExists);
    });
    //this.friendshipExists();
    this.getName();
    this.getAllPosts();
    this.getImages();
  }

  modalOpenHandler() {
    this.modalOpen = true;
  }

  async friendshipExists() {
    try {
      const response = await fetch(`https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/friends/existFriendship/${this.userProfileId}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${this.token.value}` }
      });

      if(response.status !== 200) return alert('Error!', 'Server error getting your frienship result', ['OK']);

      const data = await response.json();

      this.frienshipExists = data;

      return console.log('son amigos?', this.frienshipExists);
    } catch (error) {
      return alert('Error!', 'Unable to know if you are his/her friend', ['OK']);
    }
  }

  async getAllPosts() {
    try {
      const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/posts/getAllByUserId', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token.value}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: this.userProfileId })
      });

      if(response.status !== 200) return alert('Error!', 'Server error getting your posts', ['OK']);

      const data = await response.json();

      return this.userPosts = data.posts;
    } catch (error) {
      return alert('Error!', 'Unable to get your posts', ['OK']);
    }
  }

  getImages(){
    const imgRef = ref(this.storage, 'images');

    listAll(imgRef)
    .then(async response => {
        this.images = [];
        for(let item of response.items){
          const url = await getDownloadURL(item)
          this.images.push(url);
        }
    })
    .catch(error => console.log(error));
  }

  async getName() {
    try {
      const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/users/getNameById', {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${this.token.value}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: this.userProfileId })
      });

      if(response.status !== 200) return alert("Oops", "Something went wrong trying to get user email and name", ["OK"]);

      const data = await response.json();

      this.userName = data.name;
    } catch (error) {
      return alert("Oops", "Something went wrong trying to get user email and name", ["OK"]);
    }
  }


}
