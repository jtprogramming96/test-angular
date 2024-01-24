import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-actualizar-cliente',
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css']
})
export class ActualizarClienteComponent implements OnInit{

  cif: string;
  form: FormGroup;
  cliente: any;

  constructor(private route: ActivatedRoute,  // obtener los datos de la ruta activa
              private router: Router,         // para el navigate()
              private clientesService: ClientesService,
              ) {}  // nos traemos el servicio de la clase (para poder usarlo)

  ngOnInit(): void {
    this.cif = this.route.snapshot.params['cif']; // de la ruta, obtenemos una "captura de pantalla" de los datos, y le extraemos el parámetro que necesitamos:cif
    //console.log(this.cif);   mostramos por consola que se extrajo bien
    this.clientesService.getCliente(this.cif) // acá usamos el servicio
                        .subscribe((res: any) => {  // nos suscribimos a la respuesta que nos dé
                          this.cliente = res.cliente;  // rta para todo OK
                          this.form.patchValue(this.cliente); // al formulario, pasarle los valores de los datos del objeto javascript (angular se encarga de inicializar cada campo del formulario con el respectivo valor del objeto js)
                        }, (err: any) => {
                          console.log(err)                    // rta para el error
                        });
    this.form = new FormGroup({       // creo el nuevo formulario
      nombre: new FormControl('', [Validators.required]),    // y las propiedades que tendrá: nombre
      cif: new FormControl('', [Validators.required, Validators.minLength(9)]),       // cif
      direccion: new FormControl(''), // etc
      localidad: new FormControl(''),
    });
                      }

    modificarCliente() {
      this.clientesService.putClientes(this.form.value, this.cif)
                          .subscribe((res: any) => {  // nos suscribimos a la respuesta que nos dé
                            this.router.navigate(['/clientes']);
                          }, (err: any) => {
                            console.log(err)                    // si hay error, lo mandamos a la consola
                          });
    }
}
