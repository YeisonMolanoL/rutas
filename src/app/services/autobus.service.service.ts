import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Autobus } from '../modells/Autobus';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutobusServiceService {
  rutaGlobal: string = "http://localhost:8080/autobus/";

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Autobus[]>{   
    return this.httpClient.get<Autobus[]>(this.rutaGlobal + 'mostrar');
  }

  getAutobusesDisponibles(): Observable<Autobus[]>{
    return this.httpClient.get<Autobus[]>(this.rutaGlobal + 'disponibles')
  }

  newAutobus(autobus: Autobus): Observable<Autobus>{
    return this.httpClient.post<Autobus>(this.rutaGlobal + "agregar", autobus)
  }

  prueba() : Observable<Autobus>{
    return this.httpClient.get<Autobus>(this.rutaGlobal + 'prueba')
  }
}
