import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Compañia_Autobus } from '../modells/Compañia_Autobus';

@Injectable({
  providedIn: 'root'
})
export class CompaniaAutobusServiceService {
  rutaGlobal: string = "http://localhost:8080/compania-autobus/";

  constructor(private http: HttpClient) { }

  getAllCompanias(){
    return this.http.get<Compañia_Autobus[]>(this.rutaGlobal + 'mostrar')
  }

  newCompaniaAutobus(compania: Compañia_Autobus){
    return this.http.post<Compañia_Autobus>(this.rutaGlobal + 'agregar', compania,{
      observe: 'response'
    })
  }
}
