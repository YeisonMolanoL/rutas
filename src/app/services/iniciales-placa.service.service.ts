import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iniciales_Placa } from '../modells/Iniciales_Placa';

@Injectable({
  providedIn: 'root'
})
export class InicialesPlacaServiceService {
  rutaGlobal: string = "http://localhost:8080/inicial-placa/";

  constructor(private httpClient: HttpClient) { }

  getAll(){
    return this.httpClient.get<Iniciales_Placa[]>(this.rutaGlobal + 'mostrar')
  }
}
