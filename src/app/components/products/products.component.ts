import { Component, OnInit  } from '@angular/core';
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
export class ProductsComponent implements OnInit {  // Cambiar a ProductsComponent
  categorias: any[] = [];
  productos: any[] = [];  // Productos que se mostrarán
  selectedCategoryId: number = 0;  // Para almacenar la categoría seleccionada

  constructor(private categoriasService: CategoriasService,
    private productosService: ProductosService) {}

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
}