import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { ProductosService } from '../../services/productos.service'; 
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  categorias: any[] = [];
  productos: any[] = [];
  selectedCategoryId: number | null = null;
  selectedProduct: any = null;

  constructor(
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

  onCategoryClick(categoriaId: number): void {
    this.selectedCategoryId = categoriaId;
    this.productosService.getProductosPorCategoria(categoriaId).subscribe({
      next: (data) => {
        this.productos = data;
        if (this.productos.length > 0) {
          this.selectProduct(this.productos[0]);
        }
      },
      error: (err) => console.error('Error cargando productos', err)
    });
  }

  selectProduct(producto: any): void {
    this.selectedProduct = producto;
  }
}