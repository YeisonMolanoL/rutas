import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() titulo: string;
  ham = document.querySelector('.ham');
  enlaces = document.querySelector('.enlaces-menu');
  isLoged = false

  constructor(private tService: TokenService, private route: Router) {
    this.titulo = '';
  }

  ngOnInit(): void {
    if(this.tService.getToken()){
      this.isLoged = true;
    }
    console.log(this.isLoged);
    
  }

  prueba() {
    const ham = document.querySelector('.ham');
    const enlaces = document.querySelector('.enlaces-menu');
    const barras = document.querySelectorAll('.ham span')
    console.log('Hola');
    enlaces?.classList.toggle('activado');
    barras.forEach(child => {child.classList.toggle('animado')});
  }

  prueba1(){
    console.log('kajajaaj');
    
  }

  logOut(){
    this.tService.logOut()
  }

  logged(): void{
    this.route.navigate(['/login'])
  }
}
