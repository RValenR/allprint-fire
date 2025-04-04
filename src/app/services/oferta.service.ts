import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment'; // Importar environment

@Injectable({
  providedIn: 'root'
})
export class OfertaService {
  private apiUrl = `${environment.apiUrl}/api/ofertas/destacada`; // Usar variable de entorno

  constructor(private http: HttpClient) { }

  getOfertaDestacada(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error en OfertaService:', error);
        throw error;
      })
    );
  }
}
