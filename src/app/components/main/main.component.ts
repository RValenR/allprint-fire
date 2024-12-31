import { Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { RouterModule,Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [GalleriaModule, NzCarouselModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  slides = [
    'assets/images/fondo1.jpg',
     'assets/images/fondo2.jpg',
    'assets/images/fondo3.jpg' 
  ];
  
  secondSlides = [
    'https://via.placeholder.com/1200x400/FF5733/FFFFFF?text=Slide+1',
    'https://via.placeholder.com/1200x400/33FF57/FFFFFF?text=Slide+2',
    'https://via.placeholder.com/1200x400/3357FF/FFFFFF?text=Slide+3',
    'https://via.placeholder.com/1200x400/FF33A6/FFFFFF?text=Slide+4',
    'https://via.placeholder.com/1200x400/A633FF/FFFFFF?text=Slide+5',
    'https://via.placeholder.com/1200x400/FFA633/FFFFFF?text=Slide+6',
    'https://via.placeholder.com/1200x400/33FFA6/FFFFFF?text=Slide+7',
    'https://via.placeholder.com/1200x400/57FF33/FFFFFF?text=Slide+8',
  ];

  constructor(private router: Router) {}

  // Redirige a una página específica al hacer clic en un ítem
  redirectToPage(page: string): void {
    this.router.navigate([page]); // Reemplaza con las rutas reales de tus páginas
  }

  // Método para redirigir al producto más vendido
  redirectToProduct() {
    this.router.navigate(['/product']); // Asegúrate de que 'producto' sea la ruta correcta
  }
}
