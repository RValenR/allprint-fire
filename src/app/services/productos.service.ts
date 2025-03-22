import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private apiUrl = 'http://localhost:3000/api/productos';  // Asegúrate de usar la URL correcta de tu backend

  constructor(private http: HttpClient) {}
  // Método para obtener un solo producto por su ID
  getProductoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  // Método para obtener los detalles de un producto por ID
  getProductoPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
  // Método para obtener los productos filtrados por categoría
  getProductosPorCategoria(categoriaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?categoriaId=${categoriaId}`);
  }
  
}
