import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeService } from '../../app/services/home.service';

import * as swal from 'sweetalert2';

@Component({
  selector: 'page-notification',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {

  notifications;
  mobile = false;
  isAdmin;

  constructor(public homeService:HomeService,public navCtrl: NavController) { }

  ngOnInit() {

    if(localStorage.getItem("id_user") == null){
      swal({
        title: "Acceso",
        text: "Debes iniciar sesión para acceder aquí",
        type: "info",
        showConfirmButton: false
     })
     setTimeout(function() {
      location.href = "/login";
     }, 2000);
  }

    this.isAdmin = localStorage.getItem("isAdmin");
    var isMobile = window.matchMedia("only screen and (max-width: 576px)");
    if (isMobile.matches) {
        this.mobile = true;
    }

    this.homeService.getNotifications().subscribe(data =>{
      this.notifications = data.data[0];
      this.setValues(this.notifications);
      
    });


  }

  viewInfo(){

    let textHtml = `
    <div class="row">

      <p class="bold" style="width:100%">Acciones</p><br>
      <div class="col s12 m12">
        <div style="background: #43A047;padding:7px;color:white;margin-top:15px;">Accíon de agregado</div>
      </div>
      <div class="col s12 m12">
        <div style="background: #0288d1;padding:7px;color:white;margin-top:15px;">Accíon de edición</div>
      </div>
      <div class="col s12 m12 style="margin-bottom:35px;">
        <div style="background: #e53935;padding:7px;color:white;margin-top:15px;">Accíon de eliminación</div>
      </div>

      <p class="center-align bold" style="width:100%">Entidades</p><br>
      <div class="col s12 m6 left-align">
        <i class="material-icons background-round mt-5">account_circle</i> Usuarios (cuenta)
      </div>
      <div class="col s12 m6 left-align">
        <i class="material-icons background-round mt-5">account_box</i> Usuarios (datos)
      </div>
      <div class="col s12 m6 left-align">
        <i class="material-icons background-round mt-5">donut_small</i> Usuarios (habilidades)
      </div>
      <div class="col s12 m6 left-align">
        <i class="material-icons background-round mt-5">new_releases</i> Noticias
      </div>
      <div class="col s12 m6 left-align">
        <i class="material-icons background-round mt-5">event</i> Partidos
      </div>
      <div class="col s12 m6 left-align">
        <i class="material-icons background-round mt-5">star</i> Torneos
      </div>
      <div class="col s12 m6 left-align">
        <i class="material-icons background-round mt-5">person_add</i> Solicitud amistad
      </div>
      <div class="col s12 m6 left-align">
        <i class="material-icons background-round mt-5">record_voice_over</i> Solicitud partido
      </div>
      <div class="col s12 m6 left-align">
        <i class="material-icons background-round mt-5">place</i> Club favorito
      </div>

      
      <p class="center-align bold" style="width:100%">Entornos</p><br>
      </div>
      <div class="col s12 m12 left-align">
        <div style="padding:7px;margin-top:15px;">Frontend: TennisStar</div>
      </div>

      
      

    </div>
    `

    swal({
      title: "Referencias", 
      html: textHtml,  
      showConfirmButton: false,
      showCloseButton: true
    }).catch(swal.noop);

  }

  filter(){

    let action = $(".action")[1]["value"];
    let entity = $(".entity")[1]["value"];
    let environment = $(".environment")[1]["value"];

    $("#notifications").fadeOut();
    $("#loader").fadeIn();

    this.homeService.getNotificationsBy(action,entity,environment).subscribe(
      (response)=>{

        $("#loader").fadeOut();
        $("#notifications").fadeIn();

        this.notifications=response.data[0];
        this.setValues(this.notifications);
      })
    
  }

  setValues(notifications){
    for(let n of this.notifications){

      if(n["entity"] == "user"){
        n["entity"] = "account_circle";
      }
      if(n["entity"] == "playerUser"){
        n["entity"] = "account_box";
      }
      if(n["entity"] == "skillUser"){
        n["entity"] = "donut_small";
      }
      if(n["entity"] == "notice"){
        n["entity"] = "new_releases";
      }
      if(n["entity"] == "match"){
        n["entity"] = "event";
      }
      if(n["entity"] == "tournament"){
        n["entity"] = "stars";
      }
      if(n["entity"] == "requestFriend"){
        n["entity"] = "person_add";
      }
      if(n["entity"] == "requestMatch"){
        n["entity"] = "record_voice_over";
      }
      if(n["entity"] == "clubFavorite"){
        n["entity"] = "place";
      }
    }
  }

}
