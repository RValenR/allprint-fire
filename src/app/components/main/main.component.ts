import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { RouterModule,Router } from '@angular/router';
import Swiper from 'swiper';
import { CommonModule } from '@angular/common'; // Añade esto

import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { DataService } from '../../services/data.service';
import { HttpClientModule } from '@angular/common/http';  // Importa el módulo HttpClient
import { BannerImage } from '../../interfaces/banner-image.interface';  // Importar la interfaz
import { ParametrosService } from '../../services/parametros.service'; // Nuevo servicio
// main.component.ts (solo agregar esto en los imports)
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [GalleriaModule, NzCarouselModule, HttpClientModule, CommonModule],
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
  parametros: any = {}; // Nueva propiedad para almacenar los parámetros
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
  categorias: any[] = [];
  loadingCategorias: boolean = true;
  constructor(private router: Router, 
    private dataService: DataService,
    private parametrosService: ParametrosService,// Inyecta el nuevo servicio
    private categoriasService: CategoriasService 
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
    // Nueva llamada para obtener parámetros
    this.parametrosService.getParametros().subscribe({
      next: (data) => {
        this.parametros = data;
        console.log('Parámetros cargados:', data);
      },
      error: (error) => {
        console.error('Error al cargar parámetros:', error);
      }
    });
    this.categoriasService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        this.loadingCategorias = false;
      },
      error: (error) => {
        console.error('Error al cargar categorías:', error);
        this.loadingCategorias = false;
      }
    });
  }

  // Redirige a una página específica al hacer clic en un ítem
  redirectToPage(categoria: any) {
    this.router.navigate(['/productos'], { 
      queryParams: { categoria: categoria.id },
      state: { categoriaId: categoria.id } // Envía el ID también en el state
    });
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
      slidesPerView: 4, // 4 imágenes por slide
      spaceBetween: 30, // Espacio entre imágenes
      loop: true,
      
      autoplay: { delay: 1500, disableOnInteraction: false },
    });
  }
  // En MainComponent
encodeMessage(message: string): string {
  return encodeURIComponent(message);
}
redirectToProducts(categoriaId: number) {
  this.router.navigate(['/productos'], { 
    queryParams: { categoria: categoriaId },
    state: { 
      categoriaId: categoriaId,
    }
  });
}
}
