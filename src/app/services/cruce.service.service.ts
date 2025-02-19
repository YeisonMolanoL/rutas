import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cruce } from '../modells/Cruce';
import { Paradero } from '../modells/Paradero';
import { Ruta } from '../modells/Ruta';

@Injectable({
  providedIn: 'root'
})
export class CruceServiceService {
  private rutaGlobal = 'http://localhost:8080/cruces/';

  constructor(private http: HttpClient) { }

  getCrucesByRuta(ruta: Ruta){
    return this.http.get<Cruce[]>(this.rutaGlobal + 'cruces-ruta/' + ruta.idRuta)
  }

  getCrucesByParadero(paradero: Paradero){
    return this.http.get<Cruce[]>(this.rutaGlobal + 'cruces-paradero/' + paradero)
  }

  getAllCruces(){
    return this.http.get<Cruce[]>(this.rutaGlobal + 'mostrar');
  }

  newCruce(cruce: Cruce){      
    return this.http.post<Cruce>(this.rutaGlobal + 'agregar', cruce, {
      observe: 'response'
    })
  }

  enviarCrucesDeRuta(cruces: Cruce[]){
    this.http.post<Cruce[]>(this.rutaGlobal + 'guardar-paraderos', cruces, {
      observe: 'response'
    })
    
  }
}