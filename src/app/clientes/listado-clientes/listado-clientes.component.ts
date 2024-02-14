import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/modelos/clientes.modelo';
import { PaginacionConfig } from 'src/app/modelos/paginacion.config.modelo';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { ConfirmacionService } from 'src/app/servicios/confirmacion.service';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.css']
})
export class ListadoClientesComponent implements OnInit, PaginacionConfig{

  // inicialización de valores
  //clientes: any;
  title = '';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  tableSize: number[] = [5, 10, 15, 20];
  clientes = new Array<Cliente>();
  paginacionConfig: PaginacionConfig = {} as PaginacionConfig;  // para la configuración de paginación ngx

  constructor(private clientesService: ClientesService,           // importando el servicio del cliente (el que proporciona la api rest hacia el backend)
              private confirmacionService: ConfirmacionService) { // importando el servicio de modal de confirmacion
                
                // configuramos la paginación al instanciar el componente
                this.paginacionConfig = {
                  itemsPerPage: this.itemsPerPage,
                  currentPage: this.currentPage,
                  totalItems: this.totalItems
                }            
              }
  

  ngOnInit(): void {  // se ejecuta cada vez que se destruya y se vuelva a cargar el componente
      this.cargarClientes();
  }

  solicitarParametros(searchTitle: string, page: number, pageSize: number): any {
    let params: any = {};

    if (searchTitle) {
      params[`title`] = searchTitle;
    }

    if (page) {
      params[`page`] = page - 1;
    }

    if (pageSize) {
      params[`size`] = pageSize;
    }

    return params;
  }

  cargarClientes() {  // le pide al servidor la lista de clientes
    const parametros = this.solicitarParametros(this.title, this.currentPage, this.itemsPerPage);

     this.clientesService.getClientes(parametros)
                          .subscribe((res:any) => {
                            //console.log(JSON.stringify(res));
                            this.clientes = res.clientes;  // podemos asignar directamente res a la propiedad clientes, ya que res es la respuesta a solicitar(get) la ruta raíz, la cual devuelve un arreglo de clientes
                            this.totalItems = res.totalItems;                      // y tampoco es necesario parsear dicha lista de json a javascript, ya que la libreria http en el servidor expressJS  lo hace por nosotros
                          }, (err: any) => {  // subscribe permite un segundo parámetro, un callback para manejar el error (en caso de que haya uno)
                            console.log(err)
                          });
  }

  onTableDataChange(event:any){
    this.currentPage = event;
    this.cargarClientes();
  }
  
  onTableSizeChange(event:any): void {
    this.itemsPerPage = event.target.value;
    this.currentPage = 1;
    this.cargarClientes();
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
