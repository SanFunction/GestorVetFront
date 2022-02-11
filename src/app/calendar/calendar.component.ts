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
  events: any[] = [];
  evento: DayPilot.EventData = {};

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
      const modal = await DayPilot.Modal.prompt('Añadir nueva cita:', 'Cita');
      const dp = args.control;
      dp.clearSelection();
      if (!modal.result) {
        return;
      }
      dp.events.add(
        new DayPilot.Event({
          start: args.start,
          end: args.end,
          id: DayPilot.guid(),
          text: modal.result,
        })
      );
    },
  };

  configMonth: DayPilot.MonthConfig = {};

  constructor(
    private ds: DataService) {

    super();
    this.viewWeek();
  }

  ngAfterViewInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
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
