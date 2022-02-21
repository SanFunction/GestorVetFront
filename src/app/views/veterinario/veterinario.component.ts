import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HeaderService } from 'src/app/components/template/header/header.service';

import { MatTableDataSource } from '@angular/material/table';
import { Veterinario } from 'src/app/models/veterinario.model';
import { VeterinarioService } from 'src/app/services/veterinario.service';
import { VeterinarioCreateComponent } from 'src/app/components/veterinario-create/veterinario-create.component';

@Component({
  selector: 'app-veterinario',
  templateUrl: './veterinario.component.html',
  styleUrls: ['./veterinario.component.css'],
})
export class VeterinarioComponent implements OnInit {
  veterinarios: Veterinario[];
  displayedColumns = ['nombre', 'apellidos', 'action'];
  nuevoVet: Veterinario;
  editVet: Veterinario;
  modal: string;
  loading: boolean;

  constructor(
    private veterinarioService: VeterinarioService,
    private router: Router,
    private headerService: HeaderService,
    public dialog: MatDialog
  ) {
    headerService.headerData = {
      title: 'Listado de veterinarios',
      icon: 'storefront',
      routeUrl: '/veterinario',
    };

    this.loading = true;
    this.modal = '';
    this.editVet = {};
    this.nuevoVet = {};
    this.veterinarios = [];
  }

  ngOnInit(): void {
    this.cargarList();
  }

  cargarList() {
    this.veterinarioService.getAllVet().subscribe((vet) => {
      this.veterinarios = vet;
      this.loading = false;
    });
  }
  abrirDialogo() {
    this.modal = 'create';
    sessionStorage.removeItem('modal');
    sessionStorage.setItem('modal', this.modal);
    this.modal = '';

    const dialogo1 = this.dialog.open(VeterinarioCreateComponent, {
      data: (this.nuevoVet = {
        // id: null,
        nombre: '',
        apellidos: '',
        diagnostico: null,
      }),
    });

    dialogo1.afterClosed().subscribe((vet) => {
      this.loading = true;
      try {
        if (vet) {
          this.veterinarioService.create(vet).subscribe(() => {
            this.veterinarioService.showMessage('Veterinario creado!');
            this.router.navigate(['/veterinario']);
            this.cargarList();
          });
        } else {
          this.cargarList();
        }
      } catch (error) {}
    });
  }

  updateDialog(vet: Veterinario) {
    this.modal = 'update';
    sessionStorage.removeItem('modal');
    sessionStorage.setItem('modal', this.modal);
    this.modal = '';
    this.editVet = vet;

    const dialogo1 = this.dialog.open(VeterinarioCreateComponent, {
      data: this.editVet,
    });

    dialogo1.afterClosed().subscribe((vet) => {
      this.loading = true;

      try {
        if (vet) {
          this.veterinarioService.update(vet).subscribe(() => {
            this.veterinarioService.showMessage('Datos actualizados!');
            this.router.navigate(['/veterinario']);
            this.cargarList();
          });
        } else {
          this.cargarList();
        }
      } catch (error) {}
    });
  }

  detailDialog(vet: Veterinario) {
    this.modal = 'detail';
    sessionStorage.removeItem('modal');
    sessionStorage.setItem('modal', this.modal);
    this.modal = '';
    this.editVet = vet;

    const dialogo1 = this.dialog.open(VeterinarioCreateComponent, {
      data: this.editVet,
    });
  }

  borrarFila(vet: Veterinario) {
    this.modal = 'delete';
    sessionStorage.removeItem('modal');
    sessionStorage.setItem('modal', this.modal);
    this.modal = '';
    this.editVet = vet;

    const dialogo1 = this.dialog.open(VeterinarioCreateComponent, {
      data: this.editVet,
    });

    dialogo1.afterClosed().subscribe((vet) => {
      this.loading = true;

      try {
        if (vet) {
          this.veterinarioService.delete(vet.id).subscribe(() => {
            this.veterinarioService.showMessage('Eliminado con éxito');
            this.router.navigate(['/veterinario']);
          });
        } else {
          this.cargarList();
        }
      } catch (error) {}
    });
  }

}
