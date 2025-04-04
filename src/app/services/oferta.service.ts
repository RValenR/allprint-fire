import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {
  private apiUrl = 'http://localhost:3000/api/ofertas/destacada'; // Asegúrate que esta URL sea correcta

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