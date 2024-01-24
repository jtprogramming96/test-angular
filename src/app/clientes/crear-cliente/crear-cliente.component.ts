import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/servicios/clientes.service';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent {

  form: FormGroup;

  constructor(private clienteService: ClientesService,  // me traigo el servicio del cliente
              private router: Router) {};               // para la navegación programática

  /* Al levantarse el componente, se inicializa form*/
  ngOnInit(): void {
    this.form = new FormGroup({       // creo el nuevo formulario
      nombre: new FormControl('', [Validators.required]),    // y las propiedades que tendrá: nombre
      cif: new FormControl('', [Validators.required, Validators.minLength(9)]),       // cif
      direccion: new FormControl(''), // etc
      localidad: new FormControl(''),
    });
  }

  enviarCliente(): void { // para manejar los submits del formulario form
    // a modo de prueba: console.log(this.form.value); aquí simplemente estoy enviando a la consola (ctrl+f12) el cliente creado a través del formulario
    this.clienteService.postClientes(this.form.value)  // se solicita al servidor "postear" los datos del formulario (enviados en un objeto javaScript)
                        .subscribe((res: any) => {  // .subscribe(fnFlechaRtaOK, fnFlechaError)
                          //console.log(res);
                          this.router.navigate(['/clientes']);  // si todo salió OK, navegar a la ruta '/clientes'. esa ruta muestra la lista de clientes (incluirá el nuevo añadido)
                        }, (err: any) => {
                          console.log(err)
                        })
  
  // COMENTARIO: this.router.navigate(['/clientes']); a esto se le suele llamar "navegación programática"
                      }
}
