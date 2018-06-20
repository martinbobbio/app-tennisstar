import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../../app/services/register.service';
import { LoginService } from '../../app/services/login.service';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

import * as swal from 'sweetalert2';

@Component({
  selector: 'register',
  templateUrl: 'register.html'
})
export class RegisterPage implements OnInit {

  home = HomePage;
  login = LoginPage;

  constructor(public registerService:RegisterService,public loginService:LoginService, public navCtrl:NavController) {
    this.form = new FormGroup({
      'username': new FormControl(''),
      'password': new FormControl(''),
      'password2': new FormControl(''),
      'email': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
    })
  }

  form:FormGroup;
  
  ngOnInit() {

  }

  registerForm(){console.log(this.form.get("email"));
    let data;
    if(this.form.get("password").value === this.form.get("password2").value){
      data = {
        username: this.form.get("username").value,
        email: this.form.get("email").value,
        password: this.form.get("password").value,
      }
    }else{
      swal({
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        type: 'error',
      })
      return;
    }
    if(this.form.get("password").value == "" || this.form.get("password2").value == ""){
      swal({
        title: 'Error',
        text: 'Debe ingresar contraseña',
        type: 'error',
      })
      return;
    }
    if(this.form.get("password").value == "" || this.form.get("password2").value == ""){
      swal({
        title: 'Error',
        text: 'Debe ingresar contraseña',
        type: 'error',
      })
      return;
    }
    if(this.form.get("password").value.length < 8){
      swal({
        title: 'Error',
        text: 'La contraseña debe tener 8 caracteres como mínimo',
        type: 'error',
      })
      return;
    }
    if(!this.form.get("email").valid){
      swal({
        title: 'Error',
        text: 'No has ingresado un email correcto',
        type: 'error',
      })
      return;
    }

    this.registerService.sendData(data).subscribe(
      (response)=>{
        if(response.error != null){
          swal({
            title: 'Error',
            text: response.error[0],
            type: 'error',
          })
          return;
        }

        this.loginService.setSession(this.form.get("username").value,response.data[0].id);

        this.navCtrl.push(this.home);
        
      } ,
      (error) =>{ 
        swal({
          title: 'Error',
          text: 'Error en el registro',
          type: 'error',
        })
        this.form.reset({
          password:"",
          password2:""
        });
      }
    )
}

}