import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
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
  displayedColumns = ['id', 'nombre', 'apellidos', 'action'];
  nuevoVet: Veterinario;
  editVet: Veterinario;
  modal: string;

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

    this.modal = '';
    this.editVet = {};
    this.nuevoVet = {};
    this.veterinarios = [
    ];
  }

  ngOnInit(): void {

    this.veterinarioService.getAllVet().subscribe((vet) => {
      this.veterinarios = vet;
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
      this.veterinarioService.create(vet).subscribe(() => {
        this.veterinarioService.showMessage('Veterinario creado!');
        this.router.navigate(['/veterinario']);
      });
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
      this.veterinarioService.update(vet).subscribe(() => {
        this.veterinarioService.showMessage('Datos actualizados!');
        this.router.navigate(['/veterinario']);
      });
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
      this.veterinarioService.delete(vet.id).subscribe(() => {
        this.veterinarioService.showMessage('Eliminado con éxito');
        this.router.navigate(['/veterinario']);
      });
    });
  }

  agregar(vet: Veterinario) {
    this.veterinarios.push(this.nuevoVet);
  }

  update(vet: Veterinario) {
    this.veterinarios.push(this.nuevoVet);
  }
}
