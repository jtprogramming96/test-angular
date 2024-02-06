import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientesService } from './clientes.service';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private baseURL = 'https://tu-backend.com/api'; // Reemplaza esto con la URL de tu backend

  constructor(private http: HttpClient) { }

  addPushSubscriber(subscription: PushSubscription): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/subscribe`, subscription);
  }
}
