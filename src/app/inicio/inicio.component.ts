import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { NotificacionService } from '../servicios/notificacion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {

  readonly VAPID_PUBLIC_KEY =
    'BGxPErYdUobELG0E2DqrRClP_JjxosN83gNImvBlQteMwLLot3YxKLMPONy4X6Ge1gPgfqzJ4tXwh2-XYrylBvM';

    constructor(private swPush: SwPush,
      private notificacionService: NotificacionService) {}

  subscribeToNotifications() {

    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => this.notificacionService.addPushSubscriber(sub).subscribe())
    .catch(err => console.error("No se ha podido suscribir a las notificaciones", err));
}
}
