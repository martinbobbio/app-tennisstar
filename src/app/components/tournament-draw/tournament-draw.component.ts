import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TournamentService } from '../../services/tournament.service';
import * as swal from 'sweetalert2';

@Component({
  selector: 'tournament-draw',
  templateUrl: './tournament-draw.component.html',
})
export class TournamentDrawComponent implements OnInit {

  @Input() isAdmin:boolean = false;
  @Input() count:number;
  @Input() matchs;
  @Input() idTournament;
  @Input() status;

  constructor(public tournamentService:TournamentService,public router:Router) { }

  ngOnInit() {
  }

  uploadScore(user1,user2,position,instance){
    
    let this_aux = this;

    let id_tournament_1 = user1["id"];
    let id_tournament_2 = user2["id"];
    let id_user_1 = user1["id_user"];
    let id_user_2 = user2["id_user"];

    let textHtml = `<br>
    <div class="row">
      <div class="col s12">
        <p class="bold left-align">${user1["username"]}</p>
      </div>
      <div class="input-field col s4">
        <input id="set1a" type="number" min=0 max=7 class="validate">
        <label for="set1a">Primer set</label>
      </div>
      <div class="input-field col s4">
        <input id="set2a" type="number" min=0 max=7 class="validate">
        <label for="set2a">Segundo set</label>
      </div>
      <div class="input-field col s4">
        <input id="set3a" type="number" min=0 max=7 class="validate">
        <label for="set3a">Tercer set</label>
      </div>
      <div class="col s12">
        <p class="bold left-align">${user2["username"]}</p>
      </div>
      <div class="input-field col s4">
        <input id="set1b" type="number" min=0 max=7 class="validate">
        <label for="set1b">Primer set</label>
      </div>
      <div class="input-field col s4">
        <input id="set2b" type="number" min=0 max=7 class="validate">
        <label for="set2b">Segundo set</label>
      </div>
      <div class="input-field col s4">
        <input id="set3b" type="number" min=0 max=7 class="validate">
        <label for="set3b">Tercer set</label>
      </div>
      <div class="col s12">
        <div id="loaderMatch" class="progress" style="display:none;">
            <div class="indeterminate"></div>
        </div>
        <a id="buttonUpload" class="uploadScore waves-effect waves-light btn green">Subir</a>
        <br><br>
        <span id="warning-score" class="red-text"></span>
      </div>
    </div>
    `

    swal({
      title: "Subir resultado", 
      html: textHtml,  
      showConfirmButton: false,
      showCloseButton: true
    });

    $(document).on('click', ".uploadScore",()=> {
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
        id_tournament_1: id_tournament_1,
        id_tournament_2: id_tournament_2,
        id_user_1: id_user_1,
        id_user_2: id_user_2,
        win:win,
        position:position,
        instance:instance,
        id_tournament: this.idTournament
      }

      this_aux.tournamentService.uploadScore(data).subscribe(
        (response)=>{
          swal({
            title: "Torneo",
            type:"success",
            text: "Partido subido con exito!",
            confirmButtonText: "Volver", 
            confirmButtonColor: "#ff9800"
          });
          setTimeout(()=>{ location.href = "/tournament/"+this.idTournament }, 1500);
        });

  });
}
  

}
