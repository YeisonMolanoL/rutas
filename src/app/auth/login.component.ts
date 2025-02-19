import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RutasInterceptorService } from '../interceptors/rutas-interceptor.service';
import { LoginUsuario } from '../modells/login-usuario';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  isLoged: boolean
  isLoginFail: boolean
  roles: Array<string>

  constructor(private lService: AuthService, private fb: FormBuilder, private tService: TokenService,
    private router: Router) {
    this.loginForm = fb.group({
      nombreUsuario : new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    if(this.tService.getToken()){
      this.isLoged = true;
      this.isLoginFail = false;
      this.roles = this.tService.getAuthorities();
    }
  }

  login(){
    if(this.loginForm.valid){
      let login = new LoginUsuario(this.loginForm.get('nombreUsuario')?.value, this.loginForm.get('password')?.value)
      console.log(this.loginForm.get('nombreUsuario')?.value, this.loginForm.get('password')?.value);
      this.lService.login(login).subscribe(res =>{
        this.isLoged = true
        this.isLoginFail = false

        this.tService.setToken(res.token)
        this.tService.setUserName(res.nombreUsuario)
        this.tService.setAuthorities(res.authorities)
        this.roles = res.authorities
        this.router.navigate(['/'])
      },
      err =>{
        this.isLoged = false
        this.isLoginFail = true
        console.log(err.error);
      })
    }else{
      console.log('Por favor ingrese todos los datos');
    }
  }

  cerrarSesion(){
    this.tService.logOut()
    window.location.reload()
    console.log('Se ha cerrado la sesion');
  }

}
