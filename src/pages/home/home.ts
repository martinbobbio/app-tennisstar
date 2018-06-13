import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomeService } from '../../app/services/home.service';
import { UserService } from '../../app/services/user.service';

import { MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  notices:any[];

  fullPlayer:boolean = null;
  fullGame:boolean = null;
  fullCount:number = 0;
  completeCharge:boolean = false;

  userAnon:boolean = false;

  constructor(public menuCtrl: MenuController,public homeService:HomeService,public userService:UserService,public navCtrl: NavController) { }

  ngOnInit() {

    this.homeService.getNotices().subscribe(data =>{
      this.notices = data.data[0];
    });

    if(localStorage.getItem("id_user") == null){
      this.userAnon = true;
      $(".tabbar").fadeOut(0);
    }

    this.userService.getProfileStatus(Number(localStorage.getItem("id_user"))).subscribe(
      (response)=>{
        this.fullPlayer = response.data[0]["fullPlayer"];
        this.fullGame = response.data[0]["fullGame"];
        if(this.fullGame == true) this.fullCount++;
        if(this.fullPlayer == true) this.fullCount++;
        this.completeCharge = true;
        $("#display-map").fadeIn();
      });

    
  }

}
