import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';
import { RequestFriendService } from '../../services/request-friend.service';
import { MatchService } from '../../services/match.service';
import { TournamentService } from '../../services/tournament.service';
import { MapService } from '../../services/map.service';

import * as swal from 'sweetalert2';

declare let $: any;


@Component({
  selector: 'home-explorar',
  templateUrl: './home-explorar.component.html',
})
export class HomeExplorarComponent implements OnInit {

  users;
  matchs;
  tournaments;
  clubs;
  clubPhotoHtml="";
  clubRatingHtml="";

  @Input() fullPlayer:boolean = null;
  @Input() fullGame:boolean = null

  mobile = false;

  path:string = environment.backPathImage;

  constructor(public userService:UserService,public mapService:MapService,public tournamentService:TournamentService, public requestFriendService:RequestFriendService, public matchService:MatchService) { }

  ngOnInit() {

    var isMobile = window.matchMedia("only screen and (max-width: 576px)");
    if (isMobile.matches) {
        this.mobile = true;
    }

    this.userService.getUsersRandom().subscribe(
      (response)=>{
        this.users = response.data[0];
      } ,
      (error) =>{
      }
    )

    this.matchService.getMatchRandom().subscribe(
      (response)=>{
        this.matchs = response.data[0];
      } ,
      (error) =>{
      }
    )

    this.mapService.getClubesMost().subscribe(
      (response)=>{
        this.clubs = response.data[0];
        
      } ,
      (error) =>{
      }
    )

    this.tournamentService.getTournamentRandom().subscribe(
      (response)=>{
        this.tournaments = response.data[0];
      } ,
      (error) =>{
      }
    )

  }

  getRatingClub(rating){

    let ratingHtml:string;

    if(rating > 0.4){
      ratingHtml = `<i class="material-icons yellow-text">star_half</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i>`;
    }
    if(rating > 0.9){
      ratingHtml = `<i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i>`;
    }
    if(rating > 1.4){
      ratingHtml = `<i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star_half</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i>`;
    }
    if(rating > 1.9){
      ratingHtml = `<i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i>`;
    }
    if(rating > 2.4){
      ratingHtml = `<i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star_half</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i>`;
    }
    if(rating > 2.9){
      ratingHtml = `<i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i>`;
    }
    if(rating > 3.4){
      ratingHtml = `<i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star_half</i><i class="material-icons yellow-text">star_border</i>`;
    }
    if(rating > 3.9){
      ratingHtml = `<i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star_border</i>`;
    }
    if(rating > 4.4){
      ratingHtml = `<i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star_half</i>`;
    }
    if(rating > 4.9){
      ratingHtml = `<i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i>`;
    }

    return ratingHtml;
  }

  getPhotoClub(photo){
    if(photo != null){
      return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=${environment.googleApiKey}`;
    }else{
      return "assets/images/fondo-tenis.jpg"
    }
  }

  sendRequest(id){
    let data;
    data = {
      id: id,
    }

    $("#explore-user-"+id).fadeOut(0);

    this.requestFriendService.sendRequest(data).subscribe(
      (response)=>{
          swal({
            title: 'Solicitud enviada!',
            text: "Espera a que el usuario te acepte",
            type: 'info',
          })
          
          return;
      })
    
  }

  askMatch(userMatch){

    let this_aux = this;

    swal({
      title: "Deseas unirte al partido?",
      type: "info",
      showCancelButton: true,
      confirmButtonColor: '#f44336 ',
      cancelButtonColor: '#4caf50 ',
      confirmButtonText: 'Cancelar',
      cancelButtonText: "Aceptar"
   }).then(
         function () { return false; },
         function () {
          $("#icon-add-"+userMatch).fadeOut();
          $("#loader-match-"+userMatch).fadeIn();
          this_aux.matchService.checkMatch(userMatch).subscribe(
            (response)=>{
              $("#explore-match-"+userMatch).fadeOut();
              swal({
                title: "Te has unido al partido!",
                type: "success",
                confirmButtonText: "Volver", 
                confirmButtonColor: "#ff9800"
             })
            } ,
          )
         });
  }

}
