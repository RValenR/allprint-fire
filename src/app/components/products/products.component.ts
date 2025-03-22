import { Component, OnInit  } from '@angular/core';
import { RouterLink } from '@angular/router';  // Para navegación
import { CategoriasService } from '../../services/categorias.service';
import { ProductosService } from '../../services/productos.service'; 
import { CommonModule } from '@angular/common';   

import { Router } from '@angular/router';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {  // Cambiar a ProductsComponent
  categorias: any[] = [];
  productos: any[] = [];  // Productos que se mostrarán
  selectedCategoryId: number = 0;  // Para almacenar la categoría seleccionada
  

  constructor(private categoriasService: CategoriasService,
    private productosService: ProductosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoriasService.getCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }
  onCategoryClick(categoriaId: number): void {
    this.selectedCategoryId = categoriaId;
    // Obtener los productos de la categoría seleccionada
    this.productosService.getProductosPorCategoria(categoriaId).subscribe(data => {
      this.productos = data;
    });
  }
  // Método para redirigir a la página de detalles del producto
  goToProductDetail(id: number): void {
    this.router.navigate(['/producto', id]);
  }
}