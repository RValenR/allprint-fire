import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Importa el archivo de entorno

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  // Usa la URL base de la API desde las variables de entorno
  private apiUrl = `${environment.apiUrl}/api/productos`;  // URL base configurada en environment.ts

  constructor(private http: HttpClient) {}

  // Método para obtener un solo producto por su ID
  getProductoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Método para obtener los detalles de un producto por ID (igual que el anterior)
  getProductoPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Método para obtener los productos filtrados por categoría
  getProductosPorCategoria(categoriaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?categoriaId=${categoriaId}`);
  }
}
