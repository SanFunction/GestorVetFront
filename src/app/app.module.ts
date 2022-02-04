import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from  '@angular/material/sidenav';
import { MatCardModule } from  '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from  '@angular/material/button';
import { MatSnackBarModule } from  '@angular/material/snack-bar';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from  '@angular/common';





//Importacion de componentes navegacion
import { HeaderComponent } from './components/template/header/header.component';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';
import { HomeComponent } from './views/home/home.component';

import { from } from 'rxjs';

import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { DayPilotCalendarComponent, DayPilotModule } from '@daypilot/daypilot-lite-angular';
import { CalendarModule } from 'angular-calendar';
import { CitaComponent } from './views/cita/cita.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DataService } from './calendar/data.service';
import { ClienteComponent } from './views/cliente/cliente.component';
import { TratamientoComponent } from './views/tratamiento/tratamiento.component';
import { DiagnosticoComponent } from './views/diagnostico/diagnostico.component';

import { MascotaComponent } from './views/mascota/mascota.component';
import { ClienteCrudComponent } from './components/cliente-crud/cliente-crud.component';
import { MascotaCrudComponent } from './components/mascota-crud/mascota-crud.component';
import { VeterinarioCreateComponent } from './components/veterinario-create/veterinario-create.component';
import { TratamientoCrudComponent } from './components/tratamiento-crud/tratamiento-crud.component';
import { DiagnosticoCrudComponent } from './components/diagnostico-crud/diagnostico-crud.component';
import { VeterinarioComponent } from './views/veterinario/veterinario.component';



registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    HomeComponent,
    CitaComponent,
    CalendarComponent,
    ClienteComponent,
    TratamientoComponent,
    DiagnosticoComponent,
    VeterinarioComponent,
    MascotaComponent,
    ClienteCrudComponent,
    MascotaCrudComponent,
    VeterinarioCreateComponent,
    TratamientoCrudComponent,
    DiagnosticoCrudComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DayPilotModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDatepickerModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatSortModule,
    CommonModule,
    FormsModule
    // CalendarModule
  ],
  providers: [{
    provide: LOCALE_ID,
    useValue: 'pt-BR'

  }, 
  DataService
],

  bootstrap: [AppComponent]

})
export class AppModule { }
