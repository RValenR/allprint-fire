import { Component } from '@angular/core';

@Component({
  selector: 'app-cotizacion',
  standalone: true,
  imports: [],
  templateUrl: './cotizacion.component.html',
  styleUrl: './cotizacion.component.css'
})
export class CotizacionComponent {
  cotizacion = {
    nombre: '',
    apellido: '',
    empresa: '',
    telefono: '',
    correo: '',
    producto: '',
    descripcion: '',
    cantidad: null,
    arte: null,
    captcha: false,
  };

  onSubmit() {
    if (this.cotizacion.captcha) {
    } else {
      alert('Por favor, confirma que no eres un robot.');
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.cotizacion.arte = file;
    }
  }
}
