import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { NavBarComponent } from 'src/app/components/others/nav-bar/nav-bar.component';
import { ModalComponent } from 'src/app/components/others/modal/modal.component';
import { alert } from 'src/app/utils/alert';
import { PostComponent } from 'src/app/components/containers/post/post.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { GetResult, Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-feed-view',
  templateUrl: './feed-view.page.html',
  styleUrls: ['./feed-view.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, NavBarComponent, ModalComponent, PostComponent, ScrollingModule]
})
export class FeedViewPage implements OnInit {
  token: GetResult ;
  posts: any[] = [];

  constructor() {
    this.token = { value: '' };
  }

  async ngOnInit() {
    this.token = await Preferences.get({ key: 'token' });
    this.getFriendPosts();
  }

  async getFriendPosts() {
    try {
      const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/posts/getByFriends', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${this.token.value}` }
      });

      if(response.status !== 200) return alert('Error!', 'Server error getting your friend posts', ['OK']);

      const data = await response.json();

      return this.posts = data.posts;
    } catch (error) {
      return alert('Error!', 'Unable to get your friend posts', ['OK']);
    }
  }
}
