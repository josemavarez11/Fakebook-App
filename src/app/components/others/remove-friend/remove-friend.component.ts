import { Component, OnInit, Input } from '@angular/core';
import { alert } from 'src/app/utils/alert';
import { GetResult, Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-remove-friend',
  templateUrl: './remove-friend.component.html',
  styleUrls: ['./remove-friend.component.scss'],
  standalone: true
})
export class RemoveFriendComponent  implements OnInit {
  @Input () requestedId: string = '';

  token: GetResult;

  constructor() {
    this.token = { value: '' };
  }

  async ngOnInit() {
    this.token = await Preferences.get({ key : 'token' });
  }

  async handleClick() {
    console.log(`eliminar a ${this.requestedId} como amigo`);

    try {
      const response = await fetch('https://fakebook-api-dev-qamc.3.us-1.fl0.io/api/friends/deleteFriendship', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token.value}`
        },
        body: JSON.stringify({ friend: this.requestedId })
      });

      if(response.status !== 200) return alert ('Oops', 'Server error trying to remove friend', ['OK']);

      return alert('Success', 'Friend removed', ['OK']);
    } catch (error) {
      return alert('Error', 'Unable to remove friend', ['OK']);
    }
  }

}
