import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  
  // private apiUrl = 'http://localhost:3000/api/categorias';
  private apiUrl = 'https://allprint-backend.vercel.app/api/categorias';

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
