import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { OurInfoComponent } from './components/our-info/our-info.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProductsComponent } from './components/products/products.component';
import { CotizacionComponent } from './components/cotizacion/cotizacion.component';

export const routes: Routes = [
    // { path: '', pathMatch: 'full', redirectTo: '/main'},
    { path: '', component: MainComponent},
    { path: 'quienes-somos', component: OurInfoComponent},
    { path: 'contactanos', component: ContactComponent},
    { path: 'productos', component: ProductsComponent},
    { path: 'cotizacion', component: CotizacionComponent},

];
