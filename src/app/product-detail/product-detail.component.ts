import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  producto: any = {};

  constructor(
    private route: ActivatedRoute,
    private productosService: ProductosService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
  
    if (id) {
      this.productosService.getProductoPorId(+id).subscribe(
        (data) => {
          this.producto = data;
        },
        (error) => {
          console.error('Error al obtener el producto:', error);
        }
      );
    }
  }
  
  

  goBack(): void {
    history.back();
  }
}
