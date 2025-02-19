import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Despacho } from '../modells/Despacho';

@Injectable({
  providedIn: 'root'
})
export class DespachoServiceService {
  private rutaGlobal = 'http://localhost:8080/despacho';
  constructor(private http: HttpClient) { }

  createNewDespacho(despachoNuevo: Despacho){
    return this.http.post<Despacho>(this.rutaGlobal + '/agregar', despachoNuevo, {
      observe: 'response'
    })
  }
}
