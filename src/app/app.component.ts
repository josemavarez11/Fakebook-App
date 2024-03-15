import { Component } from '@angular/core';
import {IonApp, IonRouterOutlet} from '@ionic/angular/standalone';
import { Storage, ref } from '@angular/fire/storage';
import { uploadBytes, listAll, getDownloadURL } from '@firebase/storage';
import { RouterLink, Routes } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, RouterLink],
})
export class AppComponent {

  constructor() {
    // this.getImages();
  }

  // uploadImage($event: any){
  //   const file = $event.target.files[0];
  //   console.log(file);


  //   const imgRef = ref(this.storage, `images/${file.name}`);

  // uploadBytes(imgRef, file)
  // .then(response => console.log(response))
  // .catch(error => console.log(error));
  // }

  // getImages(){
  //   const imgRef = ref(this.storage, 'images');

  //   listAll(imgRef)
  //   .then(async response => {
  //       console.log(response);

  //       for(let item of response.items){
  //         const url = await getDownloadURL(item)
  //         console.log(url);
  //       } 
  //   })
  //   .catch(error => console.log(error));
  // }


}
