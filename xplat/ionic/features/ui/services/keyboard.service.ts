import { Injectable, NgZone } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Injectable({
  providedIn: 'root',
})
export class KeyboardService {
  isKeyboardHide=true;


  constructor(public keyboard:Keyboard, private ngZone: NgZone) {
    this.keyboard.hideFormAccessoryBar(true);
    this.keyboard.hideFormAccessoryBar(false);

    this.keyboard.onKeyboardWillShow().subscribe(()=>{
      this.ngZone.run( () => {
        this.isKeyboardHide=false;
      });

    });

    this.keyboard.onKeyboardWillHide().subscribe(()=>{
      this.ngZone.run( () => {
        setTimeout(()=>{
          this.isKeyboardHide=true;
        }, 300);

      });
    });
  }


}
