import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../app/services/login.service';
import { AuthService } from '../../app/services/auth.service';
import { UserService } from '../../app/services/user.service';
import { HomePage } from '../home/home';

import * as $ from 'jquery';
import * as swal from 'sweetalert2';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  home = HomePage

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginService:LoginService, public authService:AuthService,public userService:UserService) {

    this.authService.handleAuthentication();

    this.form = new FormGroup({
      'password': new FormControl(''),
      'username': new FormControl(''),
    })
  }

  form:FormGroup;

  ngOnInit() {

  }

  newPass(){

    let textHtml = `
    <br>
    <div class="row">
      <div class='input-field col s12 m12'>
        <input type='text' id="email"/>
        <label>Email</label>
      </div>
      <div class="col s12">
        <a id="changePassword" class="waves-effect waves-light btn green">Solicitar nueva contraseña</a>
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
      title: "Olvido su contraseña?", 
      html: textHtml,
      showConfirmButton: false,
      showCloseButton: true
    });

    $("#changePassword").on('click', () => {

      let email = $("#email")[0]["value"];

      this.userService.newPassword(email).subscribe(
        (response)=>{
          if(response.error){
            swal.close();
            swal({
              title: "Olvido su contraseña", 
              text: response.error[0],
              type: "error",
              showConfirmButton: false,
              showCloseButton: true
            });
          }console.log(response);
          if(response.data){
            swal.close();
            swal({
              title: "Olvido su contraseña", 
              text: "Se envio la contraseña a tu email",
              type: "success",
              showConfirmButton: false,
              showCloseButton: true
            });
          }
        });
    });

  }

  login(){
    this.authService.login();
  }

  loginForm(){
    if(this.form.get("username").value != "" && this.form.get("password").value != ""){
      let data = {
        username: this.form.get("username").value,
        password: this.form.get("password").value,
      }

      this.loginService.sendData(data).subscribe(
        (response)=>{

          if(response.error != null){
            return;
          }
          if(response.data[0].status == false){
            swal({
              title: 'Error',
              text: 'La contraseña es invalida',
              type: 'error',
            })
            this.form.reset({
              password:"",
            });
            return;
          }else{
            this.loginService.setSession(this.form.get("username").value,response.data[0].id);
            localStorage.setItem("isAdmin",response.data[0].isAdmin);
            this.navCtrl.push(this.home);
          }
        } ,
        (error) =>{
          swal({
            title: 'Error',
            text: 'El nombre de usuario no existe',
            type: 'error',
          })
          this.form.reset({
            password:"",
          });
        }
      )
    }else{
      swal({
        title: 'Error',
        text: 'Debes completar el nombre de usuario y contraseña',
        type: 'error',
      })
    }
  }

}
