import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paradero } from '../modells/Paradero';

@Injectable({
  providedIn: 'root'
})
export class ParaderoServiceService {
  private rutaGlobal = 'http://localHost:8080/paradero/';

  constructor(private http: HttpClient) { }

  getAllParaderos(){
    return this.http.get<Paradero[]>(this.rutaGlobal + 'mostrar');
  }

  newParadero(paradero: Paradero){
    return this.http.post<Paradero>(this.rutaGlobal + 'agregar', paradero, {
      observe: 'response'
    })
  }
}
