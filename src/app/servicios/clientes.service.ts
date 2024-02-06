import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'; // for map
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  endPointClientes: string = environments.urlBase; // puerto del servidor de solicitudes
  static endPointClientes: string;

  constructor(private http: HttpClient) { } // declaro, para el servicio, la variable http que es de tipo HttpCliente. Dicha variable me permite usar los métodos get,post,put y delete

  getClientes() { // obtener clientes
    return this.http.get(this.endPointClientes) // get recibe la url a la que vamos a hacer la petición
                .pipe(  // para gestionar la respusta
                  map((data: any) => {
                    return data;
                  })
                ); 
  }

  getCliente(cif) {
    return this.http.get(this.endPointClientes + '/' + cif)
    .pipe(  // para gestionar la respusta
                  map((data: any) => {
                    return data;
                  })
                );
  }

  postClientes(cliente) { // en esta línea, cliente es un objeto javascript
    return this.http.post(this.endPointClientes, cliente)  // aquí post lo parsea a json, lo introduce en un body, crea un mensaje
                                                            // y lo envía a la url indicada
                        .pipe(  // para gestionar lo que devuelve post()
                        map((data: any) => {
                          return data;
                        })
                      );
  // http.post(url, objetoJavaScript): post parsea el objeto js a json, lo mete en un body, lo mete en un mensaje y envía este mensaje a la url indicada por parámetro
  }

  putClientes(cliente, cif) {
    return this.http.put(this.endPointClientes + '/' + cif, cliente)
                    .pipe(  // para gestionar lo que devuelve post()
                    map((data: any) => {
                      return data;
                    })
                  );
  }

  deleteClientes(cif) {
    return this.http.delete(this.endPointClientes + '/' + cif)
                    .pipe(  // para gestionar lo que devuelve post()
                      map((data: any) => {
                        return data;
                      })
                    );
  }
}
