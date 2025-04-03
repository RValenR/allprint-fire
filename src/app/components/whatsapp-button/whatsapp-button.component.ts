import { Component, OnInit } from '@angular/core';
import { ParametrosService } from '../../services/parametros.service'; // Ajusta la ruta
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp-button.component.html',
  styleUrls: ['./whatsapp-button.component.css']
})
export class WhatsappButtonComponent implements OnInit {
  parametros: any = {};
  isLoading: boolean = true;

  constructor(private parametrosService: ParametrosService) {}

  ngOnInit() {
    this.loadParametros();
  }

  loadParametros() {
    this.parametrosService.getParametros().subscribe({
      next: (data) => {
        this.parametros = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener parámetros', err);
        this.isLoading = false;
        // Valores por defecto en caso de error
        this.parametros = {
          whatsapp_numero: '5491112345678', // Número de respaldo
          whatsapp_mensaje: 'Hola, quiero información'
        };
      }
    });
  }

  encodeMessage(message: string): string {
    return encodeURIComponent(message);
  }
}