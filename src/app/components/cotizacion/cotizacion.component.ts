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
      // Aquí puedes manejar el envío de los datos del formulario
      console.log('Formulario enviado con éxito:', this.cotizacion);
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
