import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import {
  DayPilot,
  DayPilotCalendarComponent,
  DayPilotMonthComponent,
  DayPilotNavigatorComponent,
} from '@daypilot/daypilot-lite-angular';
import { DataService } from './data.service';
import { UnsubscribeOnDestroy } from '../shared/classes/unsubscribe-on-destroy.class';
import { take, tap } from 'rxjs';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente.model';
import { CitaService } from '../services/citas.service';
import { Router } from '@angular/router';


@Component({
  selector: 'calendar-component',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent
  extends UnsubscribeOnDestroy()
  implements AfterViewInit
{
  @ViewChild('day') day!: DayPilotCalendarComponent;
  @ViewChild('week') week!: DayPilotCalendarComponent;
  @ViewChild('month') month!: DayPilotMonthComponent;
  @ViewChild('navigator') nav!: DayPilotNavigatorComponent;

  // events: DayPilot.EventData[] = [];
  comboCliente: any[] = [];
  events: any[] = [];
  // evento: DayPilot.EventData = {
  //   start: '',
  //   end: '',
  //   id: '',
  //   text: ''
  // };

  date = DayPilot.Date.today();

  configNavigator: DayPilot.NavigatorConfig = {
    showMonths: 3,
    cellWidth: 25,
    cellHeight: 25,
    onVisibleRangeChanged: (args) => {
      this.loadEvents();
    },
  };

  selectTomorrow() {
    this.date = DayPilot.Date.today().addDays(1);
  }

  changeDate(date: DayPilot.Date): void {
    this.configDay.startDate = date;
    this.configWeek.startDate = date;
    this.configMonth.startDate = date;
  }

  configDay: DayPilot.CalendarConfig = {};

  configWeek: DayPilot.CalendarConfig = {
    viewType: 'Week',
    onTimeRangeSelected: async (args) => {
  
      const form = [
        {name: "Mascota", id: "mascota"},
        {name: "Cliente", id: "idCliente", type:"select", options:this.comboCliente}
      ];

      let cita;

      await DayPilot.Modal.form(form).then(data => {
        console.log(data)
        if(data.result) {
          cita = {
            // start: args.start,
            // end: args.end,
            // id: DayPilot.guid(),
            fecha: args.start,
            id:null,
            cliente:{id:data.result['idCliente']},
            anotaciones:data.result['mascota']
          }

          this.citaService.create(cita).subscribe(() => {
            this.clienteService.showMessage('Creado con éxito!');
            this.router.navigate(['/cita']);
            window.location.reload();
          });

        }//if
       
      });
    },
    //AÑADE ESTO:
    onEventClick: (args) => {
      const dp = args.control;
      console.log('borrado',args.e.data.id)
      const confirm = DayPilot.Modal.confirm('Seguro que quieres borrar la cita?').then((value) => {
        
        if(value.result === 'OK') {

          this.citaService.delete(args.e.data.id).subscribe(()=>{

            this.citaService.showMessage('Cita creada');
            this.router.navigate(['/cita']);
            window.location.reload();
          });

          // dp.events.remove(args.e);
        }
      });

    }
  };

  configMonth: DayPilot.MonthConfig = {};

  constructor(
    private citaService:CitaService,
    private router: Router,
    private clienteService: ClienteService,
    private ds: DataService) {

    super();
    this.viewWeek();
  }

  ngAfterViewInit(): void {
    this.getClientes();
    this.loadEvents();
  }

  getClientes(){

    this.clienteService.readCombo().subscribe((data)=> {

      this.comboCliente = data.map((cliente)=> {

        return {name:`${cliente.nombre} ${cliente.descripcion}`,id:cliente.id,type:'text'}

      });

    }
    

    );
  }


  loadEvents(): void {
    this.events = [];
    const from = this.nav.control.visibleStart();
    const to = this.nav.control.visibleEnd();

    this.ds.getEvents(from, to).subscribe((result) => {
      this.events = result;
    });

    this.ds
      .read(from, to)
      .pipe(
        tap((result) => {
          result.forEach((cita) => {
            let id = cita.id;
            let anio = cita['fecha']?.substring(0, 4);
            let mes = cita['fecha']?.substring(5, 7);
            let dia = cita['fecha']?.substring(8, 10);
            let hora = cita['fecha']?.substring(11, 13);
            let text = cita['anotaciones'];

            let start = DayPilot.Date.fromYearMonthDay(anio, mes, dia).addHours(hora);
            let end = DayPilot.Date.fromYearMonthDay(anio, mes, dia).addHours(Number(hora)+1);

            this.events.push({
              start: start,
              end: end,
              id: id,
              text: text,
            });
          });

          console.log(this.events);
          // this.events = this.events3;

        })
      )
      .subscribe(); // fin servicio
  }

  viewDay(): void {
    this.configNavigator.selectMode = 'Day';
    this.configDay.visible = true;
    this.configWeek.visible = false;
    this.configMonth.visible = false;
  }

  viewWeek(): void {
    this.configNavigator.selectMode = 'Week';
    this.configDay.visible = false;
    this.configWeek.visible = true;
    this.configMonth.visible = false;
  }

  viewMonth(): void {
    this.configNavigator.selectMode = 'Month';
    this.configDay.visible = false;
    this.configWeek.visible = false;
    this.configMonth.visible = true;
  }

  // let d:any = new Date('2015-03-04T00:00:00.000Z');
  // console.log(d.getUTCHours()); // Hours
  // console.log(d.getUTCMinutes());
  // console.log(d.getUTCSeconds());
}