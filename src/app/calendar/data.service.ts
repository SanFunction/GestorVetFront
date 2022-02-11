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

  citas: any[];
  citas2: any[];
  events: any[] = [
    // {
    //   id: 1,
    //   start: DayPilot.Date.today().addHours(10),
    //   end: DayPilot.Date.today().addHours(12),
    //   text: "Cita 1"
    // },
    // {
    //   id: 2,
    //   start: DayPilot.Date.today().addHours(10),
    //   end: DayPilot.Date.today().addHours(12),
    //   text: "Cita 2"
    // },
    // {
    //   id:3,
    //   start: DayPilot.Date.fromYearMonthDay(2022,2,12).addHours(9),
    //   end:DayPilot.Date.fromYearMonthDay(2022,2,12).addHours(10),
    //   text:"Cita 3"
    // }
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
    this.citas = [];
    this.citas2 = [];


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
    // simulating an HTTP request
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.events);
      }, 50);
    });

    // return this.http.get("/api/events?from=" + from.toString() + "&to=" + to.toString());
  }


  read(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {
    return this.http.get<Cita[]>(this.baseUrl);
  }

} //
