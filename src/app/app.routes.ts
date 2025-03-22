import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { OurInfoComponent } from './components/our-info/our-info.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProductsComponent } from './components/products/products.component';
import { CotizacionComponent } from './components/cotizacion/cotizacion.component';
import { ProductDetailComponent } from './product-detail/product-detail.component'; // importar el componente de detalle

export const routes: Routes = [
    // { path: '', pathMatch: 'full', redirectTo: '/main'},
    { path: '', component: MainComponent},
    { path: 'quienes-somos', component: OurInfoComponent},
    { path: 'contactanos', component: ContactComponent},
    { path: 'productos', component: ProductsComponent},
    { path: 'cotizacion', component: CotizacionComponent},
    { path: 'producto/:id', component: ProductDetailComponent },  // Ruta para el detalle del producto

];
