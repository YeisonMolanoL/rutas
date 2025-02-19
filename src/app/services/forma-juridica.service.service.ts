import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormaJuridica } from '../modells/FormaJuridica';

@Injectable({
  providedIn: 'root'
})
export class FormaJuridicaServiceService {
  rutaGlobal = 'http://localhost:8080/forma-juridica/';

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<FormaJuridica[]>(this.rutaGlobal + 'mostrar')
  }
}
