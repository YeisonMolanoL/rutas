import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Rutas';
  prueba : boolean;

  constructor(){
    this.prueba = false;
  }

  probar(){
    this.prueba = true;
  }

  ocultar(){
    this.prueba = false;
  }
}
