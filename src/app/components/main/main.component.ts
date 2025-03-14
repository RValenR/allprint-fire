import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { RouterModule,Router } from '@angular/router';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { DataService } from '../../services/data.service';
import { HttpClientModule } from '@angular/common/http';  // Importa el módulo HttpClient
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [GalleriaModule, NzCarouselModule, HttpClientModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit, AfterViewInit{
  @ViewChild('swiperRef', { static: false }) swiperRef!: ElementRef;
  swiper!: Swiper;

  images: string[] = [
    'assets/images/fondo3.png',
    'assets/images/fondo1.png',
    'assets/images/fondo2.png' 
  ];
  

  constructor(private router: Router, 
    private dataService: DataService
  ) {}
  datos =[]
  ngOnInit() {
    this.dataService.getDatos().subscribe(
      (data) => {
        this.datos = data;
        console.log(data)

      },
      (error) => {
        console.error('Error al obtener datos', error);
      }
    );
  }

  // Redirige a una página específica al hacer clic en un ítem
  redirectToPage(page: string): void {
    this.router.navigate([page]); // Reemplaza con las rutas reales de tus páginas
  }

  // Método para redirigir al producto más vendido
  redirectToProduct() {
    this.router.navigate(['/product']); // Asegúrate de que 'producto' sea la ruta correcta
  }

  ngAfterViewInit() {
    this.swiper = new Swiper(this.swiperRef.nativeElement, {
      modules: [Navigation, Pagination, Autoplay],
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true, // Permite hacer clic en los puntos de la paginación
      },
      autoplay: { delay: 3000, disableOnInteraction: false },
    });
  }
}
