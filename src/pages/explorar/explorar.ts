import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-explorar',
  templateUrl: 'explorar.html'
})
export class ExplorarPage {

  type = 2;

  createMatch:boolean = false;
  createTournament:boolean = false;
  viewMatch:boolean = false;
  viewTournament:boolean = false;

  headerName = "Explorar";

  constructor(public navCtrl: NavController, public navParams: NavParams) {

      console.log(this.navParams);

      if(this.navParams.get('option') && this.navParams.get('option') == "favoriteClub"){
        this.type = 3;
      }
      if(this.navParams.get('option') && this.navParams.get('option') == "match"){
        this.createMatch = true;
        this.headerName = "Crear Partido";
      }
      if(this.navParams.get('option') && this.navParams.get('option') == "tournament"){
        this.createTournament = true;
        this.headerName = "Crear Torneo";
      }
      if(this.navParams.data){
        if(this.navParams.data.option == "verPartidos"){
          this.viewMatch = true;
          this.headerName = "Partidos";
        }
        if(this.navParams.data.option == "verTorneos"){
          this.viewTournament = true;
          this.headerName = "Torneos";
        }
      }
  }

}
