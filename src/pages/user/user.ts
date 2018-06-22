import { NavController, NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../app/services/user.service';
import { RequestFriendService } from '../../app/services/request-friend.service';
import { RequestMatchService } from '../../app/services/request-match.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { forEach } from '@angular/router/src/utils/collection';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClubPage } from '../club/club';

import * as swal from 'sweetalert2';

declare let $: any;

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {

  //Responsive status
  mobile:boolean = false;

  //Chart
  radarChartLabels:string[] = ['Drive', 'Réves', 'Servicio', 'Volea', 'Resistencia'];
  radarChartData:any;
  radarChartType:string = 'radar';

  //User
  user;
  user_aux;
  user_id:number;
  compareUser:boolean = false;
  isFriend:boolean = false;
  isRequestFriend:boolean = false;
  isRequestFriendMsg:string;
  isRequestMatch:boolean = false;
  isRequestMatchMsg:string;

  //Form
  formMatch:FormGroup;
  
  //Path
  path:string = environment.backPathImage;

  constructor(public userService:UserService,public navParams: NavParams, public navCtrl: NavController, public requestMatchService:RequestMatchService, public requestFriendService:RequestFriendService, public sanitizer:DomSanitizer) {

    this.formMatch = new FormGroup({
      'title': new FormControl('',Validators.required),
      'date': new FormControl(),
      'hour': new FormControl(),
    });

  }

  ngOnInit() {

    var isMobile = window.matchMedia("only screen and (max-width: 576px)");
    if (isMobile.matches) {
        this.mobile = true;
    }
    if(this.navParams.get('id')){
      this.user_id = this.navParams.get('id');
      this.compareUser = true;
    }else{
      this.user_id = Number(localStorage.getItem("id_user"));
    }

    this.userService.getProfile(this.user_id).subscribe(
      (response)=>{
        this.user = response.data[0];

        let percentSingles = 0;
        if(this.user["countSinglesLoss"]){
          if(this.user["countSinglesLoss"] != 0){
            percentSingles = Math.trunc((this.user["countSinglesWin"] / (this.user["countSinglesWin"] + this.user["countSinglesLoss"])) * 100);
          }
        }else{
          percentSingles = 100;
        }
        this.user["percentSingles"] = percentSingles;
        let percentDobles = 0;
        if(this.user["countDoblesLoss"]){
          if(this.user["countDoblesLoss"] != 0){
            percentDobles = Math.trunc((this.user["countDoblesWin"] / (this.user["countDoblesWin"] + this.user["countDoblesLoss"])) * 100);
          }
        }else{
          percentDobles = 100;
        }
        this.user["percentDobles"] = percentDobles;
        if(this.user.friends){
          this.user.friends.forEach(friend => {
            if(friend.id_user == localStorage.getItem("id_user")){
              this.isFriend = true;
            }
          });
        }
        if(this.user.requestfriend){
          this.user.requestfriend.forEach(rf => {
            if(rf.id_send == this.user.id && rf.id_receive == localStorage.getItem("id_user")){
              this.isRequestFriend = true;
              this.isRequestFriendMsg = "Te ha enviado la solicitud";
            }
            if(rf.id_send == localStorage.getItem("id_user") && rf.id_receive == this.user.id){
              this.isRequestFriend = true;
              this.isRequestFriendMsg = "Le has enviado la solicitud";
            }
          });
        }
        if(this.user.requestmatch){
          this.user.requestmatch.forEach(rm => {
            if(rm.id_send == this.user.id && rm.id_receive == localStorage.getItem("id_user")){
              this.isRequestMatch = true;
              this.isRequestMatchMsg = "Te ha invitado a jugar";
            }
            if(rm.id_send == localStorage.getItem("id_user") && rm.id_receive == this.user.id){
              this.isRequestMatch = true;
              this.isRequestMatchMsg = "Lo has invitado a jugar";
            }
          });
        }
        if(this.compareUser == false){
          this.radarChartData = [
            {
              data: [this.user.forehand, this.user.backhand, this.user.service, this.user.volley, this.user.resistence],
              label: this.user.firstname+" "+this.user.lastname
            },
          ];
        }else{
          this.userService.getProfile(Number(localStorage.getItem("id_user"))).subscribe(
            (response_aux)=>{
              this.user_aux = response_aux.data[0];
              let percentSingles = 0;
              if(this.user_aux["countSinglesLoss"]){
                if(this.user_aux["countSinglesLoss"] != 0){
                  percentSingles = Math.trunc((this.user_aux["countSinglesWin"] / (this.user_aux["countSinglesWin"] + this.user_aux["countSinglesLoss"])) * 100);
                }
              }else{
                percentSingles = 100;
              }
              this.user_aux["percentSingles"] = percentSingles;
              let percentDobles = 0;
              if(this.user_aux["countDoblesLoss"]){
                if(this.user_aux["countDoblesLoss"] != 0){
                  percentDobles = Math.trunc((this.user_aux["countDoblesWin"] / (this.user_aux["countDoblesWin"] + this.user_aux["countDoblesLoss"])) * 100);
                }
              }else{
                percentDobles = 100;
              }
              this.user_aux["percentDobles"] = percentDobles;
              let uWinSingles = 0;
              let uaWinSingles = 0;
              let uWinDobles = 0;
              let uaWinDobles = 0;
              if(this.user.userMatch){
              for(let um of this.user.userMatch){
                if(um.matchType == "Singles"){
                  if(um.team2aId == this.user_aux.id){
                    if(um.win){
                      uWinSingles++;
                    }else{
                      uaWinSingles++;
                    }
                  }
                }
                if(um.matchType == "Dobles"){
                  if(um.team2aId == this.user_aux.id){
                    if(um.win){
                      uWinDobles++;
                    }else{
                      uaWinDobles++;
                    }
                  }
                }
              }
            }
              this.user["h2hSingles"] = uWinSingles;
              this.user_aux["h2hSingles"] = uaWinSingles;
              this.user["h2hDobles"] = uWinDobles;
              this.user_aux["h2hDobles"] = uaWinDobles;

                this.radarChartData = [
                  {
                    data: [this.user.forehand, this.user.backhand, this.user.service, this.user.volley, this.user.resistence],
                    label: this.user.firstname+" "+this.user.lastname
                  },
                  {
                    data: [this.user_aux.forehand, this.user_aux.backhand, this.user_aux.service, this.user_aux.volley, this.user_aux.resistence],
                    label: this.user_aux.firstname+" "+this.user_aux.lastname
                  },
                ];
            } ,
            (error) =>{
             
            }
          )
        }
      } ,
      (error) =>{
       
      }
    )

  }

  seeFriends(){

    let textHtml = "";
    let this_aux = this;

    for (let f of this.user.friends) {
      textHtml += `
      <div class="card green">
      <div class="card-content left-align">
        <a href="/profile/${f.id_user}"><span id="${f.id_user}" class="card-title pointer goProfile">${f.username}</span></a>
        <br>
        <div class="row">
          <div class="col s3 left-align ">
            <a href="/profile/${f.id_user}">
              <img id="${f.id_user}" src="${this_aux.path}${f.path}" alt="" class="circle pointer responsive-img goProfile">
            </a>
          </div>
          <div class="col s9 left-align ">
            <p id="${f.id_user}" class="pointer goProfile">${f.firstname} ${f.lastname}</p>
            <p style="margin-top:15px;">${f.gameLevel} - ${f.gameStyle}</p>
          </div>
        </div>
      </div>
    </div>
      `
    }

    swal({
      title: "Amigos", 
      html: textHtml,  
      showConfirmButton: false, 
      showCloseButton: true,
    }).catch(swal.noop);

  }

  sendRequestFriend(id){
    let data;
    data = {
      id: id,
    }
    $("#btn-request-friend").fadeOut(0);
    this.requestFriendService.sendRequest(data).subscribe(
      (response)=>{
          swal({
            title: 'Solicitud de amistad enviada!',
            text: "Espera a que el usuario te acepte",
            type: 'info',
          })
          return;
      })
    
    }

    openRequesForm(){
      if(this.user_aux.googlePlaceId){
        $("#newMatchForm").fadeIn();
      }else{
        swal({
          title: 'Advertencia',
          text: "Para invitar a un jugador debes tener club favorito",
          type: 'info',
          confirmButtonColor: "#ff9800",
        })
      }
      
    }


    sendRequestMatch(id){

      let this_aux = this;

      if(this.formMatch.value.title == ""){
        swal({
          title: 'Título',
          text: 'Debes ingresar el título para el partido',
          type: 'error',
          confirmButtonColor: "#ff9800",
        });
        return;
      }
      if($('.datepicker')[0].value == ""){
        swal({
          title: 'Fecha',
          text: 'Debes ingresar la fecha para el partido',
          type: 'error',
          confirmButtonColor: "#ff9800",
        });
        return;
      }
      if($('.timepicker')[0].value == ""){
        swal({
          title: 'Hora',
          text: 'Debes ingresar la hora para el partido',
          type: 'error',
          confirmButtonColor: "#ff9800",
        });
        return;
      }
      let date = $('.datepicker')[0].value;
      let hour = $('.timepicker')[0].value;

      let data = {
        id_receive: this.user.id,
        title: this.formMatch.value.title,
        date: date,
        hour: hour,
        googlePlaceId: this.user_aux.googlePlaceId
      }
      this.requestMatchService.sendRequest(data).subscribe(
        (response)=>{
            $("#newMatchForm").fadeOut();
            swal({
              title: 'Solicitud de partido enviada!',
              text: "Espera a que el usuario te acepte",
              type: 'info',
            })
            setTimeout(function(){ 
              this.navCtrl.push(UserPage ,{id: this.user.id})}, 2000);
        })
      
      }

      goClub(id){
        this.navCtrl.push(ClubPage ,{id: id});
      }
  


}
