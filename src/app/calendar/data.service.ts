import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { DayPilot } from '@daypilot/daypilot-lite-angular';
import { HttpClient } from '@angular/common/http';
import { CitaService } from '../services/citas.service';
import { Cita } from '../models/cita.model';
import { HeaderService } from '../components/template/header/header.service';
import { Event } from '../models/event.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../models/cliente.model';

@Injectable()
export class DataService {

  baseUrl = 'http://localhost:8080/cita';
  events: any[] = [
  ];

  constructor(
    private snackBar: MatSnackBar,
    private citaService: CitaService,
    private headerService: HeaderService,
    private http: HttpClient
  ) {
    headerService.headerData = {
      title: 'Citas',
      icon: 'storefront',
      routeUrl: '/cita',
    };
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }


  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.events);
      }, 50);
    });
  }


  read(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {
    return this.http.get<Cita[]>(this.baseUrl);
  }
} 
