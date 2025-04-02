import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { ProductosService } from '../../services/productos.service'; 
import { CommonModule } from '@angular/common';

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
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    this.categoriasService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
        
        // Si hay categorías, seleccionar la primera y cargar sus productos
        if (this.categorias.length > 0) {
          this.onCategoryClick(this.categorias[0].id);
        }
      },
      error: (err) => console.error('Error cargando categorías', err)
    });
  }

  onCategoryClick(categoriaId: number): void {
    this.selectedCategoryId = categoriaId;
    this.productosService.getProductosPorCategoria(categoriaId).subscribe({
      next: (data) => {
        this.productos = data;
        // Seleccionar automáticamente el primer producto
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