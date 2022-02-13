import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MascotaCrudComponent } from 'src/app/components/mascota-crud/mascota-crud.component';

import { HeaderService } from 'src/app/components/template/header/header.service';
import { Mascota } from 'src/app/models/mascota.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { MascotaService } from 'src/app/services/mascota.service';
import { DiagnosticoService } from 'src/app/services/diagnostico.service';

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.css'],
})
export class MascotaComponent implements OnInit {
  mascotas: Mascota[];
  displayedColumns = ['avatar','nombre', 'especie', 'edad', 'historial', 'action'];
  nuevoMascota: Mascota;
  editMascota: Mascota;
  modal: string;
  idCliente: any;
  idMascota: any;
  mascotasCliente: any;
  loading: boolean;
  longitud: number;

  constructor(
    private diagnosticoService: DiagnosticoService,
    private mascotaService: MascotaService,
    private clienteService: ClienteService,
    private router: Router,
    private headerService: HeaderService,
    public dialog: MatDialog
  ) {
    headerService.headerData = {
      title: 'Mascotas de cliente',
      icon: 'storefront',
      routeUrl: '/mascota',
    };

    this.modal = '';
    this.editMascota = {};
    this.nuevoMascota = {
      nombre: '',
      color: '',
      edad: '',
      foto: '',
      peso: '',
      raza: '',
      especie: '',
    };
    this.mascotas = [];
    this.loading = true;
    this.longitud = 0;
  }

  ngOnInit(): void {
    this.cargarList();
  }

  abrirDialogo() {
    this.modal = 'create';
    sessionStorage.removeItem('modal');
    sessionStorage.setItem('modal', this.modal);
    this.modal = '';

    const dialogo1 = this.dialog.open(MascotaCrudComponent, {
      data: this.nuevoMascota,
    });

    dialogo1.afterClosed().subscribe((mascota) => {
      this.loading = true;
    
      try {
        mascota.id = null;
        this.mascotaService.create(mascota).subscribe(() => {
          this.mascotaService.showMessage('Creado con éxito!');
          this.router.navigate(['/mascota']);
          this.cargarList();
        });
      } catch (error) {}
    });
  }

  updateDialog(vet: Mascota) {
    this.modal = 'update';
    sessionStorage.removeItem('modal');
    sessionStorage.setItem('modal', this.modal);
    this.modal = '';
    this.editMascota = vet;

    const dialogo1 = this.dialog.open(MascotaCrudComponent, {
      data: this.editMascota,
    });

    dialogo1.afterClosed().subscribe((mascota) => {
     
      this.loading = true;
      try {
        if (mascota) {
          this.mascotaService.update(mascota).subscribe(() => {
            this.mascotaService.showMessage('Datos actualizados!');
            this.router.navigate(['/mascota']);
            this.cargarList();
          });
        } else {
          this.cargarList();
        }
      } catch (error) {}
    });
  }

  detailDialog(vet: Mascota) {
    this.modal = 'detail';
    sessionStorage.removeItem('modal');
    sessionStorage.setItem('modal', this.modal);
    this.modal = '';
    this.editMascota = vet;

    const dialogo1 = this.dialog.open(MascotaCrudComponent, {
      data: this.editMascota,
    });
  }

  borrarFila(mascota: Mascota) {
    this.modal = 'delete';
    sessionStorage.removeItem('modal');
    sessionStorage.setItem('modal', this.modal);
    this.modal = '';
    this.editMascota = mascota;

    const dialogo1 = this.dialog.open(MascotaCrudComponent, {
      data: this.editMascota,
    });

    dialogo1.afterClosed().subscribe((mascota) => {
      this.loading = true;
      if (mascota) {
        this.mascotaService.delete(mascota.id).subscribe(() => {
          this.mascotaService.showMessage('Eliminado con exito');
          this.router.navigate(['/mascota']);
          this.cargarList();
        });
      } else {
        this.cargarList();
      }
    });
  }

  cargarList() {
  
    this.idCliente = sessionStorage.getItem('idCliente');
    this.nuevoMascota.cliente = this.idCliente;

    this.clienteService.readById(this.idCliente).subscribe((cm) => {
      let aux = cm.mascotas;
      this.mascotasCliente = aux;
      this.longitud = Object.keys(this.mascotasCliente).length;
      this.loading = false;
    });
  }

  navigateToDiagnosticoCrud(mascot: Mascota): void {

    this.idMascota = mascot.id!.toString();
    sessionStorage.setItem('idMascota', this.idMascota);

    this.router.navigate(['/diagnostico']);
  }
} //class
