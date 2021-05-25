import { Component } from '@angular/core';

declare function ajout_input() :void;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  myscriptElement :HTMLScriptElement;
  title = 'pfe';
  i:Number;

  constructor(){
    this.myscriptElement=document.createElement("script");
    this.myscriptElement.src="src/assets/script.js"
  }
}
