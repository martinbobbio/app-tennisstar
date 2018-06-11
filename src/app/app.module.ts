import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Servicios
import { MapService } from './services/map.service';
import { HomeService } from './services/home.service';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { RequestFriendService } from './services/request-friend.service';
import { RequestMatchService } from './services/request-match.service';
import { MatchService } from './services/match.service';
import { TournamentService } from './services/tournament.service';

//Dependencia (Mapa)
import { AgmCoreModule } from '@agm/core';
//Dependencia (Charts)
import { ChartsModule } from 'ng2-charts';
//Dependencia (File upload)
import { FileUploadModule } from 'ng2-file-upload';
//Dependencia (Menu collapse)
import { CollapsibleModule } from 'angular2-collapsible';
//Loader Bar
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { MaterializeModule } from "angular2-materialize";


//Pipes
import { SafePipe } from './pipes/safe.pipe';

//Pages
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

//Componentes
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { MapComponent } from './components/map/map.component';
import { DodecaedroComponent } from './components/dodecaedro/dodecaedro.component';
import { NoticesComponent } from './components/notices/notices.component';
import { NoticeComponent } from './components/notice/notice.component';
import { HomeExplorarComponent } from './components/home-explorar/home-explorar.component';
import { LoaderComponent } from './components/loader/loader.component';
import { TournamentDrawComponent } from './components/tournament-draw/tournament-draw.component';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SafePipe,
    LoginPage,
    HeaderComponent,
    FooterComponent,
    MapComponent,
    DodecaedroComponent,
    NoticesComponent,
    NoticeComponent,
    HomeExplorarComponent,
    SafePipe,
    LoaderComponent,
    TournamentDrawComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAQZGWfnDR3C28jqGEiJqEQT4BvTXRy_bM'
    }),
    ChartsModule,
    FileUploadModule,
    CollapsibleModule,
    LoadingBarModule.forRoot(),
    HttpModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterializeModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MapService,
    HomeService,
    LoginService,
    RegisterService,
    AuthService,
    UserService,
    TournamentService,
    RequestFriendService,
    RequestMatchService,
    MatchService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
