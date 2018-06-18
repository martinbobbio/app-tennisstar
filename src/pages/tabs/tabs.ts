import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ExplorarPage } from '../explorar/explorar';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  home = HomePage;
  explorar = ExplorarPage;

  constructor() {

  }
}
