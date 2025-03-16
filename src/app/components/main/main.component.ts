import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { RouterModule,Router } from '@angular/router';
import Swiper from 'swiper';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { DataService } from '../../services/data.service';
import { HttpClientModule } from '@angular/common/http';  // Importa el módulo HttpClient
import { BannerImage } from '../../interfaces/banner-image.interface';  // Importar la interfaz

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [GalleriaModule, NzCarouselModule, HttpClientModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit, AfterViewInit{
  @ViewChild('swiperRef', { static: false }) swiperRef!: ElementRef;

  @ViewChild('swiperRef2', { static: false }) swiperRef2!: ElementRef;

  swiper!: Swiper;
  swiper2!: Swiper;

  images: string[] =[];
  datos =[];

  clienteLogos: string[] = [
    'assets/images/logos/bancosolidario.png',
    'assets/images/logos/edimca.png',
    'assets/images/logos/grunental.png',
    'assets/images/logos/biess.png',
    'assets/images/logos/humana.webp',
    'assets/images/logos/santillana.png',
    'assets/images/logos/fybeca.png',
    'assets/images/logos/sri.png',
    'assets/images/logos/kia.png',
    'assets/images/logos/procredit.png',
    'assets/images/logos/kfc.png',
    'assets/images/logos/sukasa.png',
    'assets/images/logos/gm.png',
    'assets/images/logos/giz.png',
    'assets/images/logos/meditropoli.png',
    'assets/images/logos/citimed.png',
    'assets/images/logos/toyota.png',
    'assets/images/logos/xerox.png'
  ];

  swiperConfig = {
    slidesPerView: 4, // Mostrar 4 imágenes a la vez
    spaceBetween: 20, // Espaciado entre imágenes
    loop: true, // Para que el carrusel sea infinito
    navigation: true, // Habilitar navegación
    autoplay: {
      delay: 3000, // Cambia cada 3 segundos
      disableOnInteraction: false
    }
  };

  constructor(private router: Router, 
    private dataService: DataService
  ) {}

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

    this.dataService.getBannerImages().subscribe(
      (response: BannerImage[]) => {
        // Extraer solo las URLs de la respuesta
        this.images = response.map(item => item.url);
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

    this.swiper2 = new Swiper(this.swiperRef2.nativeElement, {
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
