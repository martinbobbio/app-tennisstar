import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomeService } from '../../app/services/home.service';

import * as swal from 'sweetalert2';

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html'
})
export class StatsPage {

  stats;
  isAdmin;

  constructor(public homeService:HomeService, public navCtrl: NavController) { }

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

    this.homeService.getStats().subscribe(data =>{
      this.stats = data.data[0];
    });
    
  }

}
