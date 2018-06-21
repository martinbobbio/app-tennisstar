import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../app/services/user.service';
import { RequestFriendService } from '../../app/services/request-friend.service';
import { environment } from '../../environments/environment';
import { FormGroup, FormControl } from '@angular/forms';


import * as swal from 'sweetalert2';

declare let $: any;

@Component({
  selector: 'page-searchuser',
  templateUrl: 'searchuser.html'
})
export class SearchUserPage {

  users;

  path:string = environment.backPathImage;
  form:FormGroup;

  constructor(public userService:UserService, public requestFriendService:RequestFriendService, public navCtrl: NavController) {
    this.form = new FormGroup({
      'search': new FormControl(''),
    })
  }

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

    this.userService.getAllUsers().subscribe(
      (response)=>{
        this.users = response.data[0];
      } 
    )
  }
  
  searchUsers(){

    let filter = this.form.get("search").value;
    if(filter == ""){
      swal({
        title: 'Busqueda',
        text: 'El campo de busqueda esta vacio',
        type: 'info',
        showCloseButton: true
      })
      return;
    }

    this.userService.getAllUsersFilter(filter).subscribe(
      (response)=>{
        $("#search-count").fadeIn();
        this.users = null;
        this.users = response.data[0];
      } 
    )
  }

  sendRequest(id){
    let data;
    data = {
      id: id,
    }

    $("#button-add-"+id).fadeOut(0);

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

}
