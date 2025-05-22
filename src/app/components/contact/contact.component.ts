import { Component, OnInit } from '@angular/core';
import { OfertaService } from '../../services/oferta.service';
import { DatePipe, JsonPipe, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true, // <-- Esto marca el componente como standalone
  imports: [CommonModule], // <-- Importa los pipes necesarios
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [DatePipe] // Provee DatePipe para inyección
})
export class ContactComponent implements OnInit {
  oferta: any = null;
  loading = true;
  error: string | null = null;

  constructor(
    private ofertaService: OfertaService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    
    this.ofertaService.getOfertaDestacada().subscribe({
      next: (data) => {
        this.oferta = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error detallado:', err); // Depuración
        this.error = 'Error al cargar la oferta destacada';
        this.loading = false;
      }
    });
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }
}