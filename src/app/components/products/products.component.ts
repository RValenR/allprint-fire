import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { ProductosService } from '../../services/productos.service'; 
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, AfterViewInit {
  @ViewChild('mainContainer') mainContainer!: ElementRef;
  
  categorias: any[] = [];
  productos: any[] = [];
  selectedCategoryId: number | null = null;
  selectedProduct: any = null;
  private readonly headerHeight = 120; // Ajusta este valor según la altura de tu encabezado

  constructor(
    private viewportScroller: ViewportScroller,
    private categoriasService: CategoriasService,
    private productosService: ProductosService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const categoriaId = params['categoria'] ? +params['categoria'] : null;
      this.categoriasService.getCategorias().subscribe({
        next: (data) => {
          this.categorias = data;
          
          if (categoriaId && this.categorias.some(c => c.id === categoriaId)) {
            this.onCategoryClick(categoriaId);
          } else if (this.categorias.length > 0) {
            this.onCategoryClick(this.categorias[0].id);
          }
        },
        error: (err) => console.error('Error cargando categorías', err)
      });
    });
  }

  ngAfterViewInit(): void {
    this.scrollToAdjustedPosition();
  }

  private scrollToAdjustedPosition(): void {
    setTimeout(() => {
      const yOffset = this.headerHeight;
      const currentScroll = this.viewportScroller.getScrollPosition()[1];
      
      // Solo hace scroll si está cerca del top
      if (currentScroll < yOffset) {
        this.viewportScroller.scrollToPosition([0, yOffset]);
      }
      
      // Opcional: Asegurar que la categoría seleccionada sea visible
      this.scrollToSelectedCategory();
    }, 100);
  }

  private scrollToSelectedCategory(): void {
    setTimeout(() => {
      const selectedCategoryElement = document.querySelector('.categorias .active');
      if (selectedCategoryElement) {
        selectedCategoryElement.scrollIntoView({
          block: 'center',
          behavior: 'auto'
        });
      }
    }, 150);
  }

  onCategoryClick(categoriaId: number): void {
    this.selectedCategoryId = categoriaId;
    this.productosService.getProductosPorCategoria(categoriaId).subscribe({
      next: (data) => {
        this.productos = data;
        if (this.productos.length > 0) {
          this.selectProduct(this.productos[0]);
        }
        // Vuelve a ajustar la posición después de cargar productos
        this.scrollToAdjustedPosition();
      },
      error: (err) => console.error('Error cargando productos', err)
    });
  }

  selectProduct(producto: any): void {
    this.selectedProduct = producto;
  }
}