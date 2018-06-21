import { NavController, NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { MapService } from '../../app/services/map.service';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { environment } from '../..//environments/environment';

@Component({
  selector: 'page-club',
  templateUrl: 'club.html'
})
export class ClubPage implements OnInit {

  constructor(public navCtrl: NavController, public mapService:MapService,public navParams:NavParams) {

  }

  googlePlaceId:string;
  entity;
  matchs;
  tournaments;
  entityStars:string = "";
  entityPhoto:string = "";
  entityOpening:string = "";

  mobile = false;

  ngOnInit() {
    
        var isMobile = window.matchMedia("only screen and (max-width: 576px)");
        if (isMobile.matches) {
            this.mobile = true;
        }

        if(this.navParams.get('id')){
          this.googlePlaceId = this.navParams.get('id');
        }console.log(this.googlePlaceId);
    
        this.mapService.getClub(this.googlePlaceId).subscribe(
          (response)=>{
            this.entity = response.data[0].result;
            this.matchs = response.data[0].matchs;
            this.tournaments = response.data[0].tournaments;
    
            if(this.entity.photos){
              this.entityPhoto = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${this.entity.photos[0].photo_reference}&key=${environment.googleApiKey}`;
            }else{
              this.entityPhoto = "assets/images/fondo-tenis.jpg"
            }
    
            if(this.entity.opening_hours){
              if(this.entity.opening_hours.open_now == true){
                this.entityOpening = `Abierto`;
              }else{
                this.entityOpening = `Cerrado`
              }
            }else{
              this.entityOpening = `Horario desconocido`
            }
    
            if(this.entity.rating > 0.4){
              this.entityStars = `<i class="material-icons yellow-text">star_half</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i>`;
            }
            if(this.entity.rating > 0.9){
              this.entityStars = `<i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i>`;
            }
            if(this.entity.rating > 1.4){
              this.entityStars = `<i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star_half</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i>`;
            }
            if(this.entity.rating > 1.9){
              this.entityStars = `<i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i>`;
            }
            if(this.entity.rating > 2.4){
              this.entityStars = `<i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star_half</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i>`;
            }
            if(this.entity.rating > 2.9){
              this.entityStars = `<i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star_border</i><i class="material-icons yellow-text">star_border</i>`;
            }
            if(this.entity.rating > 3.4){
              this.entityStars = `<i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star_half</i><i class="material-icons yellow-text">star_border</i>`;
            }
            if(this.entity.rating > 3.9){
              this.entityStars = `<i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star_border</i>`;
            }
            if(this.entity.rating > 4.4){
              this.entityStars = `<i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star_half</i>`;
            }
            if(this.entity.rating > 4.9){
              this.entityStars = `<i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i><i class="material-icons yellow-text">star</i>`;
            }
    
    
          },
          (error)=>{
    
          }
        );
    
      }

}
