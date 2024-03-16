import { Component, OnInit, Input } from '@angular/core';
import { alert } from 'src/app/utils/alert';
import { GetResult, Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss'],
  standalone: true

})
export class AddFriendComponent  implements OnInit {
  @Input () requestedId: string = '';

  token: GetResult;

  constructor() {
    this.token = { value: '' };
  }

  async ngOnInit() {
    this.token = await Preferences.get({ key : 'token' });
  }

  async handleClick() {
    console.log(`añair a ${this.requestedId} como amigo`);

    try {
      const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/friends/sendRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token.value}`
        },
        body: JSON.stringify({ requested: this.requestedId })
      });

      if(response.status !== 200) return alert ('Oops', 'Server error trying to add friend', ['OK']);

      return alert('Success', 'Friend request sent', ['OK']);
    } catch (error) {
      return alert('Error', 'Unable to add friend', ['OK']);
    }
  }

}
