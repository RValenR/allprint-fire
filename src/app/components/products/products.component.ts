import { Component, OnInit  } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
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

  constructor(private categoriasService: CategoriasService) {}

  ngOnInit(): void {
    this.categoriasService.getCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }
}