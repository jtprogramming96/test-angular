import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { ConfirmacionService } from 'src/app/servicios/confirmacion.service';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css']
})
export class ListadoClientesComponent implements OnInit{

  clientes: any;

  constructor(private clientesService: ClientesService,
              private confirmacionService: ConfirmacionService) {}  // importando el servicio de modal de confirmacion

  ngOnInit(): void {  // se lanza cada vez que se destruya y se vuelva a cargar el componente
      this.cargarClientes();
  }

  cargarClientes() {  // le pide al servidor la lista de clientes
     this.clientesService.getClientes()
                          .subscribe((res:any) => {
                            this.clientes = res;  // podemos asignar directamente res a la propiedad clientes, ya que res es la respuesta a solicitar(get) la ruta raíz, la cual devuelve un arreglo de clientes
                                                  // y tampoco es necesario parsear dicha lista de json a javascript, ya que la libreria http en el servidor expressJS  lo hace por nosotros
                          }, (err: any) => {  // subscribe permite un segundo parámetro, un callback para manejar el error (en caso de que haya uno)
                            console.log(err)
                          });
  }

  eliminarCliente(cif) {
    const confirmationMessage = '¿Estás seguro de que quieres eliminar este elemento?';

    this.confirmacionService.openConfirmationModal(confirmationMessage)
      .then((confirmed) => {
        if (confirmed) {
          this.clientesService.deleteClientes(cif)
                        .subscribe((res:any) => {
                          this.cargarClientes();  // si se eliminó correctamente, se vuelve a cargar la lista de clientes mostrada
                        }, (err: any) => {  // subscribe permite un segundo parámetro, un callback para manejar el error (en caso de que haya uno)
                          console.log(err)
                        });
        }
      })
      .catch(() => {
        // Lógica en caso de rechazo o error
      });
    
  }
}
