import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment'; // Importa el archivo de entorno

@Injectable({
  providedIn: 'root' // Disponible en toda la app
})
export class ParametrosService {
  // Usa la variable de entorno para definir la URL base de la API
  private apiUrl = `${environment.apiUrl}/api/parametros`; // Agrega '/parametros' a la URL base

  private parametrosCache$!: Observable<any>; // <- "!" indica asignación diferida

  constructor(private http: HttpClient) {}

  // Método para obtener todos los parámetros
  getParametros(): Observable<any> {
    if (!this.parametrosCache$) {
      this.parametrosCache$ = this.http.get(this.apiUrl).pipe(
        shareReplay(1) // Cachea la respuesta para evitar múltiples peticiones
      );
    }
    return this.parametrosCache$;
  }

  // Método para obtener un parámetro específico por nombre
  getParametro(nombre: string): Observable<string> {
    return this.getParametros().pipe(
      map((parametros) => parametros[nombre] || '') // Devuelve el valor del parámetro o vacío si no lo encuentra
    );
  }
}
