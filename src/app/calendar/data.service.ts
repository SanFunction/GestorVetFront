import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {DayPilot} from "@daypilot/daypilot-lite-angular";
import {HttpClient} from "@angular/common/http";
import { CitaService } from "../services/citas.service";
import { Cita } from "../models/cita.model";
import { HeaderService } from "../components/template/header/header.service";

@Injectable()
export class DataService {

  citas: any[];
  events: any[] = [
    {
      id: "1",
      start: DayPilot.Date.today().addHours(10),
      end: DayPilot.Date.today().addHours(12),
      text: "Cita 1"
    },
    {
      id: "2",
      start: DayPilot.Date.today().addHours(10),
      end: DayPilot.Date.today().addHours(12),
      text: "Cita 2"
    },
    {
      id:"3",
      start: DayPilot.Date.fromYearMonthDay(2022,2,12).addHours(9),
      end:DayPilot.Date.fromYearMonthDay(2022,2,12).addHours(10),
      text:"Cita 3"
    }
  ];

  constructor(
    private citaService: CitaService,
    private headerService: HeaderService,
    private http : HttpClient){

      headerService.headerData = {
        title: 'Citas',
        icon: 'storefront',
        routeUrl: '/cita',
      };
      this.citas = [];

      this.cargarList();
  }

  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {

    // simulating an HTTP request
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(this.events);
      }, 200);
    });

    // return this.http.get("/api/events?from=" + from.toString() + "&to=" + to.toString());
  }


  cargarList() {

    this.citaService.read().subscribe((cit) => {
      console.log('citas de servicio',cit)
      this.citas = cit;
      // this.loading = false;
    });
  }



}//

