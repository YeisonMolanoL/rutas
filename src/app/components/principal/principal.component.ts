import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  titulo: string;
  roles: Array<string>
  isAdmin : boolean
  isUser : boolean

  constructor(private tService: TokenService) {
    this.titulo = "Gestion Rutas Tunja";
    this.isAdmin = false
    this.isUser = false
   }

  ngOnInit(): void {
    this.roles = this.tService.getAuthorities()
    this.roles.forEach(rol =>{
      console.log(rol)
      
      if(rol == 'ROLE_ADMIN'){
        this.isAdmin = true;
      }
      if(rol == 'ROLE_USER'){
        this.isUser = true;
      }
    })
  }

}
