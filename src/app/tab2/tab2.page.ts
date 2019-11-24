import { Component } from '@angular/core';
import { Post } from '../Models/Post';
import { DataService } from '../services/data.service';
import { SharedService } from '../services/shared.service';
import { Friend } from '../Models/friend';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";




@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [ Camera ]
})
export class Tab2Page {

  model = new Post();
  myFriends : Friend[]= []; 

  constructor(private data: DataService, private shared: SharedService, private camera: Camera) {
    this.data.getAllFriends().subscribe(list =>{
      this.myFriends= [];

      for (var i=0; i < list.length; i++){
        if(list[i].belongsTo == 'Moein'){
          this.myFriends.push(list[i]); 
        }
      }
    })

  }

  chooseImage(sourceType: number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: sourceType
    };

    this.camera.getPicture(options).then(
      imageData => {
        let base64Image = "data:image/jpeg;base64," + imageData;
        //console.log(base64Image);
        this.model.imageUrl = base64Image;
      },
      err => {
        // Handle error
      }
    );
  }


  sendPost(){

    if(!this.model.message && !this.model.imageUrl) return;

    this.model.createdOn=new Date();
    this.model.from= this.shared.userName; 
    console.log("saving post", this.model); 
    this.data.savePost(this.model);
    this.model= new Post();    
  }

}
