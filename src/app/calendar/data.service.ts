import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DayPilot } from '@daypilot/daypilot-lite-angular';
import { HttpClient } from '@angular/common/http';
import { CitaService } from '../services/citas.service';
import { Cita } from '../models/cita.model';
import { HeaderService } from '../components/template/header/header.service';
import { Event } from '../models/event.model';

@Injectable()
export class DataService {
  citas: any[];
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

    this.cargarList();
    // this.events = await this.cargarList();
  }


// FUNCION PRINCIPAL, es llamada desde otro componente, y devuelve transcurridos
// unos ms el array events. ESTA FUNCION DEBE ESPERAR A QUE SE TERMINEN LAS DOS FUNCIONES ANTERIORES

  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {
    // simulating an HTTP request
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.events);
      }, 2000);
    });

    // return this.http.get("/api/events?from=" + from.toString() + "&to=" + to.toString());
  }

// FUNCION 1
//Servicio para traer listado desde base de datos
  cargarList() {
    
    this.citaService.read().subscribe(async (cit) => {
      console.log('citas de servicio', cit);
      this.citas = cit;
    });
  }

  // FUNCION 2
  // una vez termina cargarList, y tengo this.citas relleno, entonces es cuando saco
  // la info de ahi y añado posiciones al array events, todo esto debe ser antes de la funcion principal. 
  citaEvento() {
    this.citas.forEach((cita)=> {
      let id = cita.id;
      let anio = cita['fecha']?.substring(0, 4);
      let mes = cita['fecha']?.substring(5, 7);
      let dia = cita['fecha']?.substring(8, 10);
      let hora = cita['fecha']?.substring(11, 13);
      let text = cita['anotaciones'];

      this.events.push({
        id: id,
        start: DayPilot.Date.fromYearMonthDay(anio, mes, dia).addHours(hora),
        end: DayPilot.Date.fromYearMonthDay(anio, mes, dia).addHours(hora + 1),
        text: text,
      });
    });
  }

  // this.citas.forEach((cita)=>{

  //   let id = cita.id;
  //   let anio = cita['fecha']?.substring(0, 4);
  //   let mes = cita['fecha']?.substring(5, 7);
  //   let dia = cita['fecha']?.substring(8, 10);
  //   let hora = cita['fecha']?.substring(11, 13);
  //   let text = cita['anotaciones'];

  //   this.events.push({
  //     id:id,
  //     start:DayPilot.Date.fromYearMonthDay(anio,mes,dia).addHours(hora),
  //     end:DayPilot.Date.fromYearMonthDay(anio,mes,dia).addHours(hora+1),
  //     text: text
  //   });
  //   console.log('eventos:',this.events)
  //   return this.events;
  // });
} //
