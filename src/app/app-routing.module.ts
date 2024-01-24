import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { ListadoClientesComponent } from './clientes/listado-clientes/listado-clientes.component';
import { CrearClienteComponent } from './clientes/crear-cliente/crear-cliente.component';
import { ActualizarClienteComponent } from './clientes/actualizar-cliente/actualizar-cliente.component';

const routes: Routes = [
  {path: '', component: InicioComponent},  // ruta de inicio
  {path: 'clientes', component: ListadoClientesComponent},  // ruta de clientes
  {path: 'crear-cliente', component: CrearClienteComponent},  // ruta para crear clientes
  {path: 'actualizar-cliente/:cif', component: ActualizarClienteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
