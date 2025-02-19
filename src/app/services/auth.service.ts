import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JWT_dto } from '../modells/JWT_dto';
import { LoginUsuario } from '../modells/login-usuario';
import { NuevoUsuario } from '../modells/nuevo-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rutaGlobal = 'http://localHost:8080/auth/'

  constructor(private http: HttpClient) { }

  public nuevoUsuario(nuevoUsuario: NuevoUsuario): Observable<any>{
    return this.http.post<any>(this.rutaGlobal + 'nuevo', nuevoUsuario);
  }

  public login(login: LoginUsuario): Observable<JWT_dto>{
    return this.http.post<JWT_dto>(this.rutaGlobal + 'login', login);
  }
}
