import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trayecto } from '../modells/Trayecto';

@Injectable({
  providedIn: 'root'
})
export class TrayectoServiceService {
  private rutaGlobal = 'http://localHost:8080/trayectos/';

  constructor(private http: HttpClient) { }

  newTrayecto(trayecto: Trayecto){
    console.log(trayecto);
    return this.http.post<Trayecto>(this.rutaGlobal + 'agregar', trayecto, {
      observe: 'response'
    })
  }

  getAll(){
    return this.http.get<Trayecto[]>(this.rutaGlobal + 'mostrar');
  }
}
