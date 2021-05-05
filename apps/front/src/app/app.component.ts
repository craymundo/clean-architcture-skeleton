import { Component, OnInit } from '@angular/core';
import { environment } from '@app-workspace/core';
import { Logger } from '@app-workspace/core/logger';


declare const navigator;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent  implements OnInit {

  
  constructor ()  {

  }

  ngOnInit() {
    if (environment.production) {
      Logger.enableProductionMode();
    }
  }

  
}
