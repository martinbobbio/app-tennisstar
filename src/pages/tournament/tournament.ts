import { Component } from '@angular/core';
import { TournamentService } from '../../app/services/tournament.service';
import { NavController, NavParams } from 'ionic-angular';
import * as swal from 'sweetalert2';

declare let $: any;

@Component({
  selector: 'page-tournament',
  templateUrl: 'tournament.html'
})
export class TournamentPage {

  mobile = false;
  tournament;
  tournament_id;

  isCreator:boolean = false;

  statusText = "Esperando jugadores";

  constructor(public tournamentService:TournamentService,public navCtrl: NavController,public navParams: NavParams) {

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

    var isMobile = window.matchMedia("only screen and (max-width: 576px)");
    if (isMobile.matches) {
        this.mobile = true;
    }
    if(this.navParams.get('id')){
      this.tournament_id = this.navParams.get('id');
    }

    this.getTournament();
  }

  leave(){
    $("#leave-button").fadeOut(0);
    $("#leave-loader").fadeIn();

    this.tournamentService.leave(this.tournament["id"],this.tournament["countTotal"]).subscribe(
      (response)=>{
        $("#leave-loader").fadeOut();
        let status = response.data[0];
        if(status == "ok"){
          swal({
            title: 'Torneo',
            text: 'Has abandonado el torneo.',
            type: 'info',
            showCloseButton: true,
            showConfirmButton: false
          });
          this.getTournament();
        }
      });

  }

  inscription(){

    $("#inscription-button").fadeOut(0);
    $("#inscription-loader").fadeIn();
    

    this.tournamentService.inscription(this.tournament["id"],this.tournament["countTotal"]).subscribe(
      (response)=>{
        $("#inscription-loader").fadeOut();
        let status = response.data[0];
        if(status == "ok"){
          swal({
            title: 'Torneo',
            text: 'Felicidades, te has inscrito al torneo',
            type: 'success',
            showCloseButton: true,
            showConfirmButton: false
          });
          this.getTournament();
        }else if(status == "error"){
          swal({
            title: 'Torneo',
            text: 'Ya estás inscrito',
            type: 'error',
            showCloseButton: true,
            showConfirmButton: false
          });
        }
      });
  }

  getTournament(){

    this.tournamentService.getTournament(this.tournament_id).subscribe(
      (response)=>{
        this.tournament = response.data[0];
        if(this.tournament.inscriptionFull){
          this.statusText = "Torneo lleno";
        }
        if(this.tournament.tournamentStart == 1){
          this.statusText = "Torneo en proceso";
        }
        if(this.tournament.status == 1){
          this.statusText = "Torneo finalizado";
        }
        if(this.tournament["id_creator"] == localStorage.getItem("id_user")){
          this.isCreator = true;
        }
      });
  }


}
