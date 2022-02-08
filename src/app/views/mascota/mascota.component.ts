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
  displayedColumns = ['id', 'nombre', 'especie', 'edad', 'historial', 'action'];
  nuevoMascota: Mascota;
  editMascota: Mascota;
  modal: string;
  idCliente: any;
  idMascota: any;
  mascotasCliente: any;
  public loading: boolean;

  constructor(
    private diagnosticoService: DiagnosticoService,
    private mascotaService: MascotaService,
    private clienteService: ClienteService,
    private router: Router,
    private headerService: HeaderService,
    public dialog: MatDialog
  ) {
    headerService.headerData = {
      title: 'Listado de mascota',
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
    this.loading = false;
  }

  ngOnInit(): void {
    console.log(this.nuevoMascota);
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
      console.log('en principal', mascota);
      try {
        mascota.id = null;
        this.mascotaService.create(mascota).subscribe(() => {
          this.mascotaService.showMessage('Creado con éxito!');
          this.router.navigate(['/mascota']);
          this.cargarList();
        });
      } catch (error) {
        console.log(error);
      }
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
            this.clienteService.showMessage('Datos actualizados!');
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
        this.clienteService.delete(mascota.id).subscribe(() => {
          this.clienteService.showMessage('Eliminado con exito');
          this.router.navigate(['/mascota']);
          this.cargarList();
        });
      } else {
        console.log('niente');
        this.cargarList();
      }
    });
  }

  cargarList() {
    this.idCliente = sessionStorage.getItem('idCliente');
    this.nuevoMascota.cliente = this.idCliente;

    // this.mascotaService.readById(this.idCliente).subscribe(m => {
    //   console.log(m)
    //   this.mascotas = m
    // })
    this.clienteService.readById(this.idCliente).subscribe((cm) => {
      let aux = cm.mascotas;

      console.log(aux);

      this.mascotasCliente = aux;
    });
  }

  navigateToDiagnosticoCrud(mascot: Mascota): void {
    // this.idCliente = client.id.toString();
    // sessionStorage.setItem("idCliente", ()!.toString());
    // this.clienteService.readById(client.id).subscribe((cl) => {
    //  console.log('peticion servicio',cl)
    // });
    this.idMascota = mascot.id!.toString();
    sessionStorage.setItem('idMascota', this.idMascota);

    this.router.navigate(['/diagnostico']);
  }
} //class
