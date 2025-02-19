import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NuevoUsuario } from '../modells/nuevo-usuario';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.css']
})
export class NuevoUsuarioComponent implements OnInit {
  formNewUsuario: FormGroup
  aurhorities: Array<string>
  isAdmin = false

  constructor(private fb: FormBuilder, private aService: AuthService, private route: Router) {
    this.aurhorities = new Array<string>()
    this.formNewUsuario = fb.group({
      nombre : new FormControl('', [Validators.required]),
      nombreUsuario: new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required])
    })
   }

  ngOnInit(): void {
  }

  nuevoUsuario(){
    if(this.formNewUsuario.valid){
      let nuevoUsuario = new NuevoUsuario()
      nuevoUsuario.nombre = this.formNewUsuario.get('nombre')?.value
      nuevoUsuario.nombreUsuario  = this.formNewUsuario.get('nombreUsuario')?.value
      nuevoUsuario.password = this.formNewUsuario.get('password')?.value
      nuevoUsuario.email = this.formNewUsuario.get('email')?.value
      if(this.isAdmin){
        this.aurhorities.push('admin')
      }
      nuevoUsuario.authorities = this.aurhorities
      this.aService.nuevoUsuario(nuevoUsuario).subscribe(res => {
        this.route.navigate(['/login'])
      })
    }else{
      console.log('Por favor llene todos los campos');
      
    }
  }

}
