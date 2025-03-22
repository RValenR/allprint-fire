import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BannerImage } from '../interfaces/banner-image.interface';  // Importar la interfaz


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://allprint-backend.vercel.app/api/datos';  // Cambia esta URL a la de tu API
  private imgApi = 'https://allprint-backend.vercel.app/imagenes/banner';
  constructor(private http: HttpClient) {}

  getDatos(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getBannerImages(): Observable<BannerImage[]> {
    return this.http.get<BannerImage[]>(this.imgApi);
  }
}
