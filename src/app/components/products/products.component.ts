import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
export class ProductsComponent implements OnInit {
  @ViewChild('mainContainer') mainContainer!: ElementRef;
  
  categorias: any[] = [];
  productos: any[] = [];
  selectedCategoryId: number | null = null;
  selectedProduct: any = null;

  constructor(
    private categoriasService: CategoriasService,
    private productosService: ProductosService,
    private route: ActivatedRoute,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const categoriaId = params['categoria'] ? +params['categoria'] : null;
      const navigation = this.router.getCurrentNavigation();
      const shouldScroll = (navigation?.extras.state as any)?.scrollToCategory;
      
      this.categoriasService.getCategorias().subscribe({
        next: (data) => {
          this.categorias = data;
          console.log(this.categorias);
          if (categoriaId && this.categorias.some(c => c.id === categoriaId)) {
            this.onCategoryClick(categoriaId, shouldScroll);
          } else if (this.categorias.length > 0) {
            this.onCategoryClick(this.categorias[0].id, shouldScroll);
          }
        },
        error: (err) => console.error('Error cargando categorías', err)
      });
    });

    // Manejar el fragmento de URL para scroll
    this.route.fragment.subscribe(fragment => {
      if (fragment && fragment.startsWith('categoria-')) {
        const categoryId = parseInt(fragment.split('-')[1]);
        setTimeout(() => {
          this.scrollToMainContainer();
        }, 300);
      }
    });
  }

  onCategoryClick(categoriaId: number, shouldScroll: boolean = false): void {
    this.selectedCategoryId = categoriaId;
    this.productosService.getProductosPorCategoria(categoriaId).subscribe({
      next: (data) => {
        this.productos = data;
        console.log(this.productos)
        if (this.productos.length > 0) {
          this.selectProduct(this.productos[0]);
        }
        if (shouldScroll) {
          setTimeout(() => {
            this.scrollToMainContainer();
          }, 300);
        }
      },
      error: (err) => console.error('Error cargando productos', err)
    });
  }

  private scrollToMainContainer(): void {
    if (this.mainContainer && this.mainContainer.nativeElement) {
      this.mainContainer.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  selectProduct(producto: any): void {
    this.selectedProduct = producto;
  }
}