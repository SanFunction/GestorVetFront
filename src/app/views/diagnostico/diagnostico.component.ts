import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DiagnosticoCrudComponent } from 'src/app/components/diagnostico-crud/diagnostico-crud.component';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { Diagnostico } from 'src/app/models/diagnostico.model';
import { Mascota } from 'src/app/models/mascota.model';
import { Veterinario } from 'src/app/models/veterinario.model';
import { DiagnosticoService } from 'src/app/services/diagnostico.service';
import { MascotaService } from 'src/app/services/mascota.service';
import { VeterinarioService } from 'src/app/services/veterinario.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css'],
})
export class DiagnosticoComponent implements OnInit {
  diagnosticos: Diagnostico[];
  displayedColumns = ['fecha', 'estado', 'enfermedad', 'tratamiento', 'action'];
  nuevoDiagnostico: Diagnostico;
  editDiagnostico: Diagnostico;
  modal: string;
  idDiagnostico: string;
  mascotaDiagnosticos: Diagnostico[];
  mascota: Mascota;
  idMascota: any;
  idHidden: boolean;
  comboVeterinario: Veterinario[];
  loading: boolean;
  veterinarioDiagnostico: Veterinario[];

  constructor(
    private veterinarioService: VeterinarioService,
    private mascotaService: MascotaService,
    private diagnosticoService: DiagnosticoService,
    private router: Router,
    private headerService: HeaderService,
    public dialog: MatDialog
  ) {
    headerService.headerData = {
      title: 'Historial de mascota',
      icon: 'storefront',
      routeUrl: '/diagnostico',
    };

    this.modal = '';
    this.editDiagnostico = {};
    this.idDiagnostico = '';
    this.loading = false;
    this.nuevoDiagnostico = {};
    this.diagnosticos = [];
    this.mascotaDiagnosticos = [];
    this.idHidden = true;
    this.comboVeterinario = [];
    this.mascota = {};
    this.veterinarioDiagnostico = [];
  }

  ngOnInit(): void {
    this.listVeterinario();
    this.cargarList();
  }

  abrirDialogo() {
    this.modal = 'create';
    sessionStorage.removeItem('modal');
    sessionStorage.setItem('modal', this.modal);
    this.modal = '';

    const dialogo1 = this.dialog.open(DiagnosticoCrudComponent, {
      data: (this.nuevoDiagnostico = {}),
    });

    dialogo1.afterClosed().subscribe((diag) => {
      this.loading = false;
      try {
        if (diag) {
          diag.mascota = this.mascota;
          diag.mascota.id = Number(this.idMascota);

          this.diagnosticoService.create(diag).subscribe(() => {
            this.diagnosticoService.showMessage('Creado con éxito!');
            this.router.navigate(['/diagnostico']);
            this.cargarList();
          });
        } else {
          this.cargarList();
        }
      } catch (error) {}
    });
  }

  updateDialog(diag: Diagnostico) {
    this.modal = 'update';
    sessionStorage.removeItem('modal');
    sessionStorage.setItem('modal', this.modal);
    this.modal = '';
    // this.diagnosticoService.getVetporIdDiagnostico(diag.id).subscribe((v) => {
    //   diag.veterinario = v;
    // });

    this.editDiagnostico = diag;
    const dialogo1 = this.dialog.open(DiagnosticoCrudComponent, {
      data: this.editDiagnostico,
    });

    dialogo1.afterClosed().subscribe((diag) => {
      try {
        if (diag) {
          this.diagnosticoService.update(diag).subscribe(() => {
            this.diagnosticoService.showMessage('Datos actualizados!');
            this.router.navigate(['/diagnostico']);
            this.cargarList();
          });
        } else {
          this.cargarList();
        }
      } catch (error) {}
    });
  }

  detailDialog(diag: Diagnostico) {
    this.modal = 'detail';
    sessionStorage.removeItem('modal');
    sessionStorage.setItem('modal', this.modal);
    this.modal = '';

    this.editDiagnostico = diag;

    const dialogo1 = this.dialog.open(DiagnosticoCrudComponent, {
      data: this.editDiagnostico,
    });
  }

  borrarFila(diag: Diagnostico) {
    this.modal = 'delete';
    sessionStorage.removeItem('modal');
    sessionStorage.setItem('modal', this.modal);
    this.modal = '';
    this.editDiagnostico = diag;

    const dialogo1 = this.dialog.open(DiagnosticoCrudComponent, {
      data: this.editDiagnostico,
    });

    dialogo1.afterClosed().subscribe((diag) => {
      this.loading = false;

      if (diag) {
        this.diagnosticoService.delete(diag.id).subscribe(() => {
          this.diagnosticoService.showMessage('Eliminado con exito');
          this.router.navigate(['/diagnostico']);
          this.cargarList();
        });
      } else {
        this.cargarList();
      }
    });
  }

  listVeterinario() {
    this.veterinarioService
      .getAllVet()
      .pipe(take(1))
      .subscribe((data) => {
        this.comboVeterinario = data;
        // this.loading = false
      });
  }

  cargarList() {
    this.idMascota = sessionStorage.getItem('idMascota');

    this.mascotaService.diagnosticoById(this.idMascota).subscribe((md) => {
      let aux = md;
      this.mascotaDiagnosticos = aux;
      this.mascotaDiagnosticos.forEach((element) => {
        let aux = element['fecha'];
        let anio = aux?.substring(0, 4);
        let mes = aux?.substring(5, 7);
        let dia = aux?.substring(8, 10);

        element['fecha'] = `${dia}/${mes}/${anio}`;
      });
    }); // servicio
    this.loading = false;
  } // funcion carga

  navigateToMascotaCrud(diag: Diagnostico): void {
    // this.idDiagnostico = (diag.id).toString();

    //  console.log(this.idDiagnostico);
    //  sessionStorage.setItem('idDiagnostico',this.idDiagnostico);

    this.router.navigate(['/mascota/{id}']);
  }
}
