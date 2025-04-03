import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // Disponible en toda la app
})
export class ParametrosService {
  private apiUrl = 'http://localhost:3000/api/parametros'; // Ajusta la URL
  private parametrosCache$!: Observable<any>; // <- "!" indica asignación diferida

  constructor(private http: HttpClient) {}

  getParametros(): Observable<any> {
    if (!this.parametrosCache$) {
      this.parametrosCache$ = this.http.get(this.apiUrl).pipe(
        shareReplay(1) // Cachea la respuesta
      );
    }
    return this.parametrosCache$;
  }

  // Método para obtener un parámetro específico
  getParametro(nombre: string): Observable<string> {
    return this.getParametros().pipe(
      map((parametros) => parametros[nombre] || '')
    );
  }
}