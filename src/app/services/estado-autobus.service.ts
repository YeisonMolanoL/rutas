import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadoAutobus } from '../modells/EstadoAutobus';

@Injectable({
  providedIn: 'root'
})
export class EstadoAutobusService {
  private rutaGlobal = 'http://localhost:8080/estado-autobus/';

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<EstadoAutobus[]>(this.rutaGlobal + 'mostrar');
  }
}
