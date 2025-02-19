import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../modells/Persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaServiceService {
  private rutaGlobal = 'http://localhost:8080/persona/';

  constructor(private http: HttpClient) { }

  getAllPersonas(){
    return this.http.get<Persona[]>(this.rutaGlobal + 'mostrar')
  }

  newPersona(persona: Persona){
    return this.http.post<Persona>(this.rutaGlobal + 'agregar', persona,{
      observe: 'response'
    })
  }
}
