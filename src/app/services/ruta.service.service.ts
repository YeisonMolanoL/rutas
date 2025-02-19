import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ruta } from '../modells/Ruta';

@Injectable({
  providedIn: 'root'
})
export class RutaServiceService {
  private rutaGlobal = 'http://localhost:8080/ruta/';

  constructor(private http: HttpClient) { }

  getAllRutas(){
    return this.http.get<Ruta[]>(this.rutaGlobal + 'mostrar')
  }

  getRutaById(ruta: Ruta){
    return this.http.get<Ruta>(this.rutaGlobal + ruta.idRuta);
  }

  newRuta(ruta: Ruta){
    return this.http.post<Ruta>(this.rutaGlobal + "agregar", ruta, {
      observe: 'response'
    })
  }

  getByNombre(nombre: String){
    return this.http.get<Ruta>(this.rutaGlobal + nombre );
  }
}
