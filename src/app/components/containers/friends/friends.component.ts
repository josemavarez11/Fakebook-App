import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences, GetResult } from '@capacitor/preferences';
import { alert } from 'src/app/utils/alert';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss'],
  standalone: true
})
export class FriendsComponent  implements OnInit {
  token: GetResult ;
  photos: string[] = [];

  @Input () name: string = '';
  @Input () applicantId: string = '';

  constructor(private router: Router) {
    this.token = { value:'' }
  }

  async ngOnInit() {
    this.token = await Preferences.get({key: 'token'});
  }

  async handleAcceptDeclineClick(answer: boolean) {
    try {
      const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/friends/answerRequest', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token.value}`,
        },
        body: JSON.stringify({
          applicant: this.applicantId,
          answer: answer
        })
      });

      if (response.status !== 200) return alert('Error!', 'Server error trying to accept/decline the friend request', ['OK']);
      return this.router.navigate(['/feed']);
    } catch (error) {
      return alert('Error!', 'Unknown error trying to accept/decline the friend request', ['OK']);
    }
  }
}
