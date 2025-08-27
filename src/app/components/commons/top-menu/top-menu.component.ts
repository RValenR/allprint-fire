import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ParametrosService } from '../../../services/parametros.service';
import { CommonModule } from '@angular/common'; // Necesario para *ngIf

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [RouterModule, CommonModule], // Añade CommonModule
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.css'
})
export class TopMenuComponent implements OnInit {
  @Output() actionSelected: EventEmitter<any> = new EventEmitter();
  menuOpen = false;
  mapsUrl: string = ''; // Variable para almacenar la URL de Maps

  constructor(private parametrosService: ParametrosService) {}

  ngOnInit() {
    this.loadMapsUrl();
  }

  async loadMapsUrl() {
    try {
      const parametros = await this.parametrosService.getParametros().toPromise();
      this.mapsUrl = parametros.maps_ubicacion;
    } catch (error) {
      console.error('Error al cargar parámetros:', error);
    }
  }

  addNewData() {
    this.actionSelected.emit({ action: 'addNew' });
  }

  logOut() {
    this.actionSelected.emit({ action: 'logOut' });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  openMaps() {
    if (this.mapsUrl) {
      window.open(this.mapsUrl, '_blank');
    }
  }

    // Cierra el menu contextual si se da click en otro lado
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    console.log('Click detected outside:', target);
    if (!target.closest('.menu-bar')) {
      console.log('Closing menu');
      this.menuOpen = false;
    }
  }
}
