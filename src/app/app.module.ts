import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'  // para el HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { ListadoClientesComponent } from './clientes/listado-clientes/listado-clientes.component';
import { CrearClienteComponent } from './clientes/crear-cliente/crear-cliente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ActualizarClienteComponent } from './clientes/actualizar-cliente/actualizar-cliente.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmacionModalComponent } from './confirmacion-modal/confirmacion-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ListadoClientesComponent,
    CrearClienteComponent,
    ActualizarClienteComponent,
    ConfirmacionModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule, // librería de formularios
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
