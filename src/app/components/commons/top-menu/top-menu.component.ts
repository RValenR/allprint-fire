import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.css'
})
export class TopMenuComponent {
  @Output() actionSelected: EventEmitter<any> = new EventEmitter();

  menuOpen = false;

  addNewData() {
    this.actionSelected.emit({ action: 'addNew' })
  }
  logOut(){
    this.actionSelected.emit({ action: 'logOut' })
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen; // Alterna el estado del menú
  }
}
