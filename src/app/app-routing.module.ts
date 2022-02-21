
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./views/home/home.component";

import { CitaComponent } from "./views/cita/cita.component";
import { ClienteComponent } from "./views/cliente/cliente.component";
import { MascotaComponent } from "./views/mascota/mascota.component";
import { TratamientoComponent } from "./views/tratamiento/tratamiento.component";
import { DiagnosticoComponent } from "./views/diagnostico/diagnostico.component";
import { VeterinarioComponent } from "./views/veterinario/veterinario.component";
import { LogInComponent } from "./views/log-in/log-in.component";
import { UserviewComponent } from "./views/userview/userview.component";


const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  // {
  //   path: "userView",
  //   component: UserviewComponent
  // },
  {
    path: "cita",
    component: CitaComponent
  },
  {
    path: "cliente",
    component: ClienteComponent
  },
  {
    path: "veterinario",
    component: VeterinarioComponent
  },
  {
    path: "diagnostico",
    component: DiagnosticoComponent
  },
  {
    path: "tratamiento",
    component: TratamientoComponent
  },
  {
    path: "mascota",
    component: MascotaComponent
  },
    // TODO: Uncomment when logIn were repaired
  // {
  //   path: "",
  //   component: LogInComponent
  // },
   // {
  //   path: "redirect",
  //   component: RedirectComponent,
  //   children:[
  //  {
  //   path: "cliente",
  //   component: ClienteComponent
  // },
  // {
  //   path: "veterinario",
  //   component: VeterinarioComponent
  // },
  // {
  //   path: "diagnostico",
  //   component: DiagnosticoComponent
  // },
  // {
  //   path: "tratamiento",
  //   component: TratamientoComponent
  // },
  // {
  //   path: "mascota",
  //   component: MascotaComponent
  // },
  //]
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
