import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from './components/commons/top-menu/top-menu.component';
import { FooterComponent } from './components/commons/footer/footer.component';
import { SaleBlockComponent } from './components/commons/sale-block/sale-block.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopMenuComponent, FooterComponent, SaleBlockComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'allprint-fire';
}
