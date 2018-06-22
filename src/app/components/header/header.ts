import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { TournamentService } from '../../services/tournament.service';
import { MatchService } from '../../services/match.service';
import { environment } from '../../../environments/environment';
import { RequestFriendService } from '../../services/request-friend.service';
import { RequestMatchService } from '../../services/request-match.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { NavController,MenuController } from "ionic-angular";

import { StatsPage } from '../../../pages/stats/stats';
import { TournamentPage } from '../../../pages/tournament/tournament';
import { NotificationsPage } from '../../../pages/notifications/notifications';
import { ExplorarPage } from '../../../pages/explorar/explorar';
import { UserPage } from '../../../pages/user/user';

import * as swal from 'sweetalert2';
declare let $: any;

@Component({
  selector: 'headeraux',
  templateUrl: 'header.html'
})
export class HeaderAuxComponent implements OnInit {

  stats = StatsPage;
  notifications = NotificationsPage;
  tournament = TournamentPage;
  explorar = ExplorarPage;
  users = UserPage;

  openMenu:boolean = false;
  openMenuScroll = false;
  profile:any[];
  username:string;
  isAdmin;

  isNewUser;
  mobile = false;
  
  pathImg:string;
  path:string = environment.backPathImage;

  requestFriends:any[];
  requestFriendsHtml:string = "";
  requestMatch:any[];
  requestMatchHtml:string = "";

  friends:any[];

  matchs:any[];
  matchHtml:string = "";
  tournaments:any[];
  tournamentHtml:string = "";

  myTournaments:any[];

  completeChargue:boolean = false;

  @Input() nameHeader:string = "";

  requestCount = 0;
  eventCount = 0;

  openAside(){
    if(!this.openMenu){
      $(".sidebar-left-collapse").fadeIn();
      this.openMenu = true;
    }
    else if(this.openMenu){
      $(".sidebar-left-collapse").fadeOut();
      this.openMenu = false;
      }
  }

  openRequests(){

    this.requestCount = this.requestFriends.length + this.requestMatch.length;
    
    if(this.requestFriends.length != 0 || this.requestMatch.length != 0){
      $("#btn-request").removeClass("red-text");
      swal({
        html: this.requestFriendsHtml+this.requestMatchHtml,
        confirmButtonText: "Volver", 
        confirmButtonColor: "#ff9800",
        showCloseButton: true,
      }).catch(swal.noop);

      let this_aux = this;

      $(document).on('click', ".acceptRequestFriend", function() {
        this_aux.requestFriendService.sendResponseFriend(this.id,1).subscribe(
          (response)=>{
            this_aux.requestFriendsHtml = "";
            this_aux.requestMatchHtml = "";
            this_aux.chargueRequests();
            swal.close();
          });

      });

      $(document).on('click', ".declineRequestFriend", function() {
        this_aux.requestFriendService.sendResponseFriend(this.id,0).subscribe(
          (response)=>{
            this_aux.requestFriendsHtml = "";
            this_aux.requestMatchHtml = "";
            this_aux.chargueRequests();
            swal.close();
          });
      });

      $(document).on('click', ".acceptRequestMatch", function() {
        this_aux.requestMatchService.sendResponseMatch(this.id,1).subscribe(
          (response)=>{
            this_aux.requestFriendsHtml = "";
            this_aux.requestMatchHtml = "";
            this_aux.chargueRequests();
            swal.close();
          });

      });

      $(document).on('click', ".declineRequestMatch", function() {
        this_aux.requestMatchService.sendResponseMatch(this.id,0).subscribe(
          (response)=>{
            this_aux.requestFriendsHtml = "";
            this_aux.requestMatchHtml = "";
            this_aux.chargueRequests();
            swal.close();
          });
      });

      $(document).on('click', ".goProfile", function() {
        this.navCtrl.push(UserPage,{id: this.id})
      });

    }else{
      swal({
        text: "No tienes solicitudes", 
        confirmButtonText: "Volver", 
        confirmButtonColor: "#ff9800"
      }).catch(swal.noop);;
    }
  }

  viewFriends(){

    let this_aux = this;

    this.requestFriendService.getFriends().subscribe(
      (response)=>{

        this.friends = response.data[0];
        let textHtml = "";

        for (let f of this.friends) {
          textHtml += `
          <div id="goUser-${f.id}" style="width:25%;display:inline-block">
            <img id="${f.id_user}" src="${this.path}${f.path}" alt="" class="circle pointer responsive-img">
          </div>
          <div id="goUser-${f.id} style="width:75%;display:inline-block">
            <p id="${f.id_user}" class="bold left-align pointer">${f.firstname} ${f.lastname}</p>
            <p class="left-align">${f.gameLevel} - ${f.gameStyle}
            </p>
            <button id="${f.id}" class="button-modal removeFriend">Borrar</button>
            <br><br><br>
          </div>
          `
          $(document).on('click', "#goUser-"+f["id"], ()=> {
            swal.close();
            this_aux.navCtrl.push(this_aux.users,{id: f["id"]})
          });
        }
        if(textHtml == ""){
          textHtml = "Aún no tienes amigos, agrega a jugadores similares a tu juego"
        }
        swal({
          title: "Amigos", 
          html: textHtml,  
          confirmButtonText: "Volver", 
          confirmButtonColor: "#ff9800",
          showCloseButton: true
        }).catch(swal.noop);
      });

      $(document).on('click', ".removeFriend", function() {
        this_aux.requestFriendService.sendResponseFriend(this.id,0).subscribe(
          (response)=>{
            swal.close();
            swal({
              title: "Amigo borrado", 
              confirmButtonText: "Volver",
              confirmButtonColor: "#ff9800",
              type: "success"
            });
          });
      });

      $(document).on('click', ".goProfile", function() {
        swal.close();
        this_aux.navCtrl.push(UserPage,{id: this.id})
      });
  }

  viewEvents(){

      if(this.matchHtml == "" && this.tournamentHtml == ""){
        this.matchHtml = "Aún no tienes eventos, inscribete en algún partido o torneo"
      }

      $("#btn-event").removeClass("red-text");

      swal({
        html: this.matchHtml+this.tournamentHtml,  
        confirmButtonText: "Volver", 
        confirmButtonColor: "#ff9800",
        showCloseButton: true,
      }).catch(swal.noop);;

  }

  constructor(public auth:AuthService,public navCtrl: NavController,public menuCtrl: MenuController, private loadingBar: LoadingBarService,public tournamentService:TournamentService, public matchService:MatchService,public userService:UserService,public requestMatchService:RequestMatchService, public requestFriendService:RequestFriendService) {
    auth.handleAuthentication();
  }

  ngOnInit() {

    this.loadingBar.start();
    this.isAdmin = localStorage.getItem("isAdmin");
    this.isNewUser = localStorage.getItem("new_user");
    var isMobile = window.matchMedia("only screen and (max-width: 576px)");
    if (isMobile.matches) {
        this.mobile = true;
    }

    setTimeout(() => {
      if($("nav").width() < 975){
        $("#label-username").fadeOut();
      }
    }, 1);
    

    this.username = localStorage.getItem("username");
    
    setTimeout(()=> {
      var links = $('.links');

      links.on('click', function () {
      links.removeClass('selected');
      $(this).addClass('selected');
      });
    }, 1);

    this.tournamentService.getMyTournaments().subscribe(
      (response)=>{
        this.myTournaments = response.data[0];
      });

    this.chargueRequests();
    this.chargueEvents();

    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      if(this.auth.isAuthenticated()){
        this.auth.getProfile((err, profile) => {
          this.profile = profile;
        });
      }
    }


    if(Number(localStorage.getItem("id_user")) != 0){
    this.userService.getImageProfile(Number(localStorage.getItem("id_user"))).subscribe(
      (response)=>{
        this.pathImg = response.data[0]["path"];
        this.completeChargue = true;
      })
    }else{
      this.completeChargue = true;
    }
    

  }

  adminTournament(){

    let this_aux = this;

    let textHtml = ``
    for (let t of this.myTournaments) {
      textHtml += `
          <div class="">
            <a href="/club/${t["googlePlaceId"]}" class="waves-effect waves-light btn black">Club</a>
          </div>
          <br>
          <p class="black-text">${t["title"]}</p>
          <span class="bold black-text fs-14">${t["date"]}</span>
          <br>
          <span class="bold black-text fs-14">${t["clubTitle"]}</span>
          <br>
          <span class="bold black-text fs-14">${t["countStatus"]}/${t["countTotal"]} Jugadores</span>
        </div>
        <br><br>
        <div class="">
          <a style="margin-right:0px;" id="view-${t["id"]}" class="white-text bold pointer button-modal-grey">Ver torneo</a>
        </div>
      </div>
      <hr>
      <br>
        `
        $(document).on('click', "#view-"+t["id"], ()=> {
          swal.close();
          this_aux.navCtrl.push(this.tournament,{id: t["id"]})
        });
      }
    if(this.myTournaments.length == 0){
      textHtml = "No has creado ningun torneo, crea uno y empeza a subir resultados!";
    }

    swal({
      title: "Mis torneos", 
      html: textHtml,  
      showConfirmButton: false,
      showCloseButton: true
    }).catch(swal.noop);

    


  }

  changuePassword(){

    let textHtml = `
    <br>
    <div class="row">
      <div class='input-field col s12 m6'>
        <label>Contraseña nueva</label><br>
        <input type='password' id="new-pass"/><br>
      </div>
      <div class='input-field col s12 m6'>
        <label>Repite contraseña nueva</label><br>
        <input type='password' id="new-pass2"/><br>
      </div>
      <div class='input-field col s12'>
        <label>Contraseña anterior</label><br>
        <input type='password' id="pass1"/><br>
      </div>
      <div class='input-field col s12'>
        <label>Repite la contraseña anterior</label><br>
        <input type='password' id="pass2"/><br>
      </div>
      <div class="col s12">
        <button id="changePassword" class="button-modal-grey">Cambiar contraseña</button>
        <div id="loader" class="row" style="display:none;">
          <div class="progress">
            <div class="col s12">
              <div class="indeterminate"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;

    swal({
      title: "Cambiar contraseña", 
      html: textHtml,  
      showConfirmButton: false,
      showCloseButton: true
    }).catch(swal.noop);

    $("#changePassword").on('click', () => {

      let newPass = $("#new-pass")[0].value;
      let newPass2 = $("#new-pass2")[0].value;
      let pass1 = $("#pass1")[0].value;
      let pass2 = $("#pass2")[0].value;

      if(newPass.length < 8 || newPass2.length < 8){
        swal({
          title: "Cambio de contraseña", 
          text: "La contraseña nueva debe tener minimo 8 digitos",
          type: "info",  
          showConfirmButton: false,
          showCloseButton: true
        }).catch(swal.noop);
        return;
      }

      if(newPass == "" && newPass2 == "" && pass1 == "" && pass2 == ""){
        swal({
          title: "Cambio de contraseña", 
          text: "Los campos no pueden estar vacios",
          type: "info",  
          showConfirmButton: false,
          showCloseButton: true
        }).catch(swal.noop);
        return;
      }
      
      if(newPass == newPass2){

      $("#changePassword").fadeOut();
      $("#loader").fadeIn();

      let data = {
        newPass: newPass,
        pass1: pass1,
        pass2: pass2,
      }

      this.userService.changePassword(data).subscribe(
        (response)=>{
          swal.close();
          let status = response.data[0];
          if(status == 1){
            swal({
              title: "Éxito", 
              text: "Se ha cambiado tu contraseña",
              type: "success",  
              showConfirmButton: false,
              showCloseButton: true
            }).catch(swal.noop);
          }else if(status == 0){
            swal({
              title: "Error", 
              text: "Las contraseñas anteriores no coinciden",
              type: "error",  
              showConfirmButton: false,
              showCloseButton: true
            }).catch(swal.noop);
          }
          
        }
      );

    }else{
      swal({
        title: "Error", 
        text: "Las contraseñas nuevas no coinciden",
        type: "error",  
        showConfirmButton: false,
        showCloseButton: true
      }).catch(swal.noop);;
    }

      
      
    });
    
  }

  chargueEvents(){

    setTimeout(()=> {
      $("#btn-event").fadeOut();
      $("#load-events").fadeIn();
    }, 1);

    this.matchService.getMatchs().subscribe(
      (response)=>{
        this.matchs = response.data[0];

        let this_aux = this;
        
        if(this.matchs.length != 0){

          $("#btn-event").addClass("red-text");
          this.matchHtml += `<p class="bold left-align">Partidos</p>`
          for (let m of this.matchs) {
            this.matchHtml += `
            <div class="card green">
            <div class="card-content left-align">
              <span class="card-x green-text bold fs-19 goProfile">${m.title} (${m.type})</span>
              <br> <span class="bold green-text fs-14">${m.dateText}</span>
              <br><br>
              <div class="row" style="width:100%;">
                <div class="col s4 left-align">
                `
                if(m.type == "Singles" && m.count == 2){
                  this.matchHtml += `
                  <div class ="row" style="width:100%;">
                    <div class ="col s6">
                      <img id="${m.player1AId}" src="${this_aux.path}${m.player1APath}" width="35px" height="35px" alt="z" class="circle pointer goProfile">
                    </div>
                    <div class ="col s6">
                      <img id="${m.player2AId}" src="${this_aux.path}${m.player2APath}" width="35px" height="35px" alt="z" class="circle pointer goProfile">
                    </div>
                  </div>
                  `
                }
                if(m.type == "Singles" && m.count == 1){
                  this.matchHtml += `
                    <img id="${m.player1AId}" src="${this_aux.path}${m.player1APath}" width="35px" height="35px" alt="z" class="circle pointer goProfile">
                  `
                }
                if(m.type == "Dobles" && m.count == 4){
                  this.matchHtml += `
                  <div class ="row" style="width:100%;">
                    <div class ="col s6">
                      <img id="${m.player1AId}" src="${this_aux.path}${m.player1APath}" width="35px" height="35px" alt="z" class="circle pointer goProfile">
                      <br><br>
                      <img id="${m.player2AId}" src="${this_aux.path}${m.player2APath}" width="35px" height="35px" alt="z" class="circle pointer goProfile">
                    </div>
                    <div class ="col s6">
                      <img id="${m.player1BId}" src="${this_aux.path}${m.player1BPath}" width="35px" height="35px" alt="z" class="circle pointer goProfile">
                      <br><br>
                      <img id="${m.player2BId}" src="${this_aux.path}${m.player2BPath}" width="35px" height="35px" alt="z" class="circle pointer goProfile">
                    </div>
                  </div>
                  `
                }
                if(m.type == "Dobles" && m.count != 4){
                  this.matchHtml += `
                  <div class ="row" style="width:100%;">
                  `
                  if(m.player1AId != null){
                    this.matchHtml += `
                    <div class ="col s6">
                      <img id="${m.player1AId}" src="${this_aux.path}${m.player1APath}" width="35px" height="35px" alt="z" class="circle pointer goProfile">
                    </div>
                    `
                  }
                  if(m.player1BId != null){
                    this.matchHtml += `
                    <div class ="col s6">
                      <img id="${m.player1BId}" src="${this_aux.path}${m.player1BPath}" width="35px" height="35px" alt="z" class="circle pointer goProfile">
                    </div>
                    `
                  }
                  if(m.player2AId != null){
                    this.matchHtml += `
                    <div class ="col s6">
                      <img id="${m.player2AId}" src="${this_aux.path}${m.player2APath}" width="35px" height="35px" alt="z" class="circle pointer goProfile">
                    </div>
                    `
                  }
                  if(m.player2BId != null){
                    this.matchHtml += `
                    <div class ="col s6">
                      <img id="${m.player2BId}" src="${this_aux.path}${m.player2BPath}" width="35px" height="35px" alt="z" class="circle pointer goProfile">
                    </div>
                    `
                  }
                  this.matchHtml += `
                  </div>
                  `
                }
                this.matchHtml += ` 
                </div>
                <div class="left-align" style="width:100%;">
                `
                if(m.type == "Singles" && m.count == 2){
                  this.matchHtml += `
                  <p class="pointer fs-14 black-text center-align">
                  <span id="${m.player1AId}" class="goProfile"> ${m.player1AUsername}</span>
                  VS
                  <span id="${m.player2AId}" class="goProfile">${m.player2AUsername}</span>
                  </p>
                  <p id="${m.player2AId}" class="pointer fs-14 black-text center-align goProfile"></p>
                  `
                }
                if(m.type == "Singles" && m.count == 1){
                  this.matchHtml += `
                  <span class="fs-14">Estás esperando un jugador más</span>
                  `
                }
                if(m.type == "Dobles" && m.count == 4){
                  this.matchHtml += `
                  <br>
                  <p class="pointer fs-14 black-text center-align">
                  ${m.player1AUsername} y ${m.player1BUsername}
                  VS
                  ${m.player2AUsername} y ${m.player2BUsername}
                  </p>
                  `
                }
                if(m.type == "Dobles" && m.count != 4){
                  this.matchHtml += `
                  <p id="${m.player1AId}" class="fs-14 black-text center-align">${m.player1AUsername} ${m.player1BUsername} ${m.player2AUsername} ${m.player2BUsername} están buscando jugadores</p>
                  `
                }
                this.matchHtml += ` 
                </div>
              </div>
            </div>
            
            ` 
              if((m.type == "Singles" && m.count == 2) || (m.type == "Dobles" && m.count == 4)){
                this.matchHtml += `
                <div class="card-action white">
                  <a style="margin-right:0px;" id="${m.idMatch}" class="uploadResult button-modal-grey white-text pointer">Subir resultado</a>
                </div>
                `
              }
              this.matchHtml += ` 
          </div>
          <br><br>
            `
        }
      }

      $(document).on('click', ".goProfile", function() {
        swal.close();
        this_aux.navCtrl.push(UserPage,{id: this.id})
      });

      $(document).on('click', ".uploadResult", function(e) {

        let id_match = e.target.id;
        swal.close();

        let textHtml = `<br>
          <label for="set1a">Primer set tuyo</label>
          <br>
          <input style="width:100%" id="set1a" type="number" min=0 max=7 class="validate">

          <label for="set1b">Primer set rival</label>
          <br>
          <input style="width:100%" id="set1b" type="number" min=0 max=7 class="validate">

          <label for="set2a">Segundo set tuyo</label>
          <br>
          <input style="width:100%" id="set2a" type="number" min=0 max=7 class="validate">

          <label for="set2b">Segundo set rival</label>
          <br>
          <input style="width:100%" id="set2b" type="number" min=0 max=7 class="validate">

          <label for="set3a">Tercer set tuyo</label>
          <br>
          <input style="width:100%" id="set3a" type="number" min=0 max=7 class="validate">

          <label for="set3b">Tercer set rival</label>
          <br>
          <input style="width:100%" id="set3b" type="number" min=0 max=7 class="validate">
            
            <div id="loaderMatch" class="progress" style="display:none;">
                <div class="indeterminate"></div>
            </div>
            <br>
            <a id="buttonUpload" class="uploadScore button-modal-grey waves-effect waves-light btn green">Subir</a>
            <br><br>
            <span id="warning-score" class="red-text"></span>
        `

        swal({
          title: "Subir resultado", 
          html: textHtml,  
          showConfirmButton: false,
          showCloseButton: true
        });

        $(document).on('click', ".uploadScore", function() {
          let set1a = "";
          let set1b = "";
          let set1c = "";
          let set2a = "";
          let set2b = "";
          let set2c = "";
          let win = false;

          set1a = $("#set1a")[0]["value"];
          set1b = $("#set2a")[0]["value"];
          set1c = $("#set3a")[0]["value"];
          set2a = $("#set1b")[0]["value"];
          set2b = $("#set2b")[0]["value"];
          set2c = $("#set3b")[0]["value"];

          if(set1a == "" || set1b == "" || set2a == "" || set2b == ""){
            $("#warning-score").text("*El primer y segundo set deben ser completados");
            return;
          }
          if((set1a == set2a) || (set1b == set2b) || (set1c == set2c && set1c != "" && set2c != "")){
            $("#warning-score").text("*El set no puede terminar empatado");
            return;
          }
          if(Number(set1a) > 7){
            $("#warning-score").text("*La máxima cantidad de games son 6 o 7(tiebreak)");
            return;
          }
          if(set1a > set2a && set2b > set1b && set1c == "" && set2c == ""){
            $("#warning-score").text("Set iguales, completar el 3er set");
            return;
          }
          if(set2a > set1a && set1b > set2b && set1c == "" && set2c == ""){
            $("#warning-score").text("Set iguales, completar el 3er set");
            return;
          }
          if(set1a > set2a && set1b > set2b){
            win = true;
          }else if(set1c > set2c && set1c != "" && set2c != "" && ((set1a > set2a && set1b < set2b) || (set1a < set2a && set1b > set2b))){
            win = true;
          }

          $("#warning-score").text("");
          $("#buttonUpload").fadeOut();
          $("#loaderMatch").fadeIn();

          let data = {
            set1a: set1a,
            set1b: set1b,
            set1c: set1c,
            set2a: set2a,
            set2b: set2b,
            set2c: set2c,
            idMatch: id_match,
            win:win
          }
    
          this_aux.matchService.uploadScore(data).subscribe(
            (response)=>{
              this_aux.matchHtml = "";
              this_aux.chargueEvents();
              swal({
                title: "Partido",
                type:"success",
                text: "Partido subido con exito!",
                confirmButtonText: "Volver", 
                confirmButtonColor: "#ff9800"
              });
            });

        });

  
      });

      this.tournamentService.getTouranentsByUser().subscribe(
        (response)=>{
          this.tournaments = response.data[0];

          if(this.tournaments.length != 0){

          $("#btn-event").addClass("red-text");

          this.tournamentHtml = `
          <p class="bold left-align">Torneos</p>
          <div class="row">
          `
          for (let t of this.tournaments) {
            this.tournamentHtml += `
              <div class="left-align black-text">
                <a href="/club/${t["googlePlaceId"]}" class="waves-effect waves-light btn black">Club</a>
                <p class="card-x green-text fs-19">${t["title"]} (${t["date"]})</p>
                <p class="bold fs-14">${t["countStatus"]}/${t["countTotal"]} Jugadores</p>
                <a id="view-tournament-${t["id"]}" class="white-text button-modal-grey pointer">Ver</a>
              </div>
              `
              $(document).on('click', "#view-tournament-"+t["id"], ()=> {
                swal.close();
                this.navCtrl.push(this.tournament,{id: t["id"]})
              });
            }
            this.tournamentHtml += `
          </div>
          `
          }
          $("#btn-event").fadeIn();
          $("#load-events").fadeOut();
          this.loadingBar.complete();

          this.eventCount = this.matchs.length + this.tournaments.length;
        });

        

      });      

  }

  chargueRequests(){

    setTimeout(()=> {
      $("#btn-request").fadeOut();
      $("#load-requests").fadeIn();
    }, 1);

    this.requestFriendService.getRequests().subscribe(
      (response)=>{
          
          this.requestFriends = response.data[0];
          let this_aux = this;

          if(this.requestFriends.length != 0){
            $("#btn-request").addClass("red-text");
            this.requestFriendsHtml += `<p class="bold left-align">Solicitudes de amistad</p>`
            for (let rf of this.requestFriends) {
              this.requestFriendsHtml += `
              <div class="card green">
              <div class="card-content left-align white-text">
                <span id="${rf.id_user}" class="card-title pointer goProfile">${rf.username}</span>
                <br>
                <div class="row">
                  <div class="col s3 left-align ">
                    <img id="${rf.id_user}" src="${this_aux.path}${rf.path}" alt="" class="circle pointer responsive-img goProfile">
                  </div>
                  <div class="col s9 left-align ">
                    <p id="${rf.id_user}" class="pointer black-text goProfile">${rf.firstname} ${rf.lastname}</p>
                    <p class="black-text" style="margin-top:15px;">${rf.gameLevel} - ${rf.gameStyle}</p>
                  </div>
                </div>
              </div>
              <div class="card-action white">
                <a id="${rf.id}" class="acceptRequestFriend green-text btn-modal pointer">Aceptar</a>
                <a id="${rf.id}" class="declineRequestFriend btn-modal red-text pointer">Rechazar</a>
              </div>
            </div>
              `
            }
          }

          $("#btn-request").fadeIn();
          $("#load-requests").fadeOut();

          return;
      })
      this.requestMatchService.getRequests().subscribe(
        (response)=>{
            
            this.requestMatch = response.data[0];
            let this_aux = this;
  
            if(this.requestMatch.length != 0){
              $("#btn-request").addClass("red-text");
              this.requestMatchHtml += `<br><p class="bold left-align">Solicitudes de partidos</p>`
              for (let rm of this.requestMatch) {
                this.requestMatchHtml += `
                <div class="card green">
                <div class="card-content left-align white-text">
                  <span id="${rm.id_user}" class="card-title black-text pointer goProfile">${rm.username} te ha invitado a un singles</span>
                  <br>
                  <div class="row">
                    <div class="col s3 left-align ">
                      <img id="${rm.id_user}" src="${this_aux.path}${rm.path}" alt="" class="circle pointer responsive-img goProfile">
                    </div>
                    <div class="col s9 left-align ">
                      <p id="${rm.id_user}" class="pointer black-text goProfile">${rm.firstname} ${rm.lastname} te ha invitado a jugar en su club el dia ${rm.dateText}.</p>
                      <p class="black-text" style="margin-top:15px;">${rm.gameLevel} - ${rm.gameStyle}</p>
                    </div>
                  </div>
                </div>
                <div class="card-action white">
                  <a id="${rm.id}" class="acceptRequestMatch green-text pointer">Aceptar</a>
                  <a id="${rm.id}" class="declineRequestMatch red-text pointer">Rechazar</a>
                </div>
              </div>
                `
              }
            }

            $("#btn-request").fadeIn();
            $("#load-requests").fadeOut();
  
            return;
        })
  }

  logout(){
    this.auth.logout();
    location.reload();
  }

  goCreateMatch(){
    this.navCtrl.push(this.explorar,{option: "match"})
  }
  goCreateTournament(){
    this.navCtrl.push(this.explorar,{option: "tournament"})
  }
  goAssignClub(){
    this.navCtrl.push(this.explorar,{option: "favoriteClub"})
  }
  goProfile(){
    this.navCtrl.push(UserPage);
  }

}
