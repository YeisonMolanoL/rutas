import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlmacenamientoService {
  private rutaGlobal = "http://localhost:8080/imagen/";

  constructor(private http: HttpClient) { }

  saveImage(image: FormData): Observable<any>{
    return this.http.post(this.rutaGlobal + 'subir', image)
  }
}
