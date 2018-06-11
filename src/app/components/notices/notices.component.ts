import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'notices',
  templateUrl: './notices.component.html',
})
export class NoticesComponent implements OnInit {

  @Input() notices:any[];

  constructor() {}

  ngOnInit() {
  }

}
