import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/template/header/header.service';

import { MatDialog } from '@angular/material/dialog';
import { Tratamiento } from 'src/app/models/tratamiento.model';
import { TratamientoService } from 'src/app/services/tratamiento.service';
import { TratamientoCrudComponent } from 'src/app/components/tratamiento-crud/tratamiento-crud.component';

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css'],
})
export class TratamientoComponent implements OnInit {
  tratamientos: Tratamiento[];
  displayedColumns = ['detalle', 'precio', 'action'];
  nuevoTratamiento: Tratamiento;
  editTratamiento: Tratamiento;
  modal: string;
  idTratamiento: string;
  loading: boolean;

  constructor(
    private tratamientoService: TratamientoService,
    private router: Router,
    private headerService: HeaderService,
    public dialog: MatDialog
  ) {
    headerService.headerData = {
      title: 'Listado de tratamientos',
      icon: 'storefront',
      routeUrl: '/tratamiento',
    };

    this.modal = '';
    this.tratamientos = [];
    this.editTratamiento = {};
    this.idTratamiento = '';
    this.nuevoTratamiento = {};
    this.loading = true;
  }

  ngOnInit(): void {
    this.cargarList();
  }

  abrirDialogo() {
    this.modal = 'create';
    sessionStorage.removeItem('modal');
    sessionStorage.setItem('modal', this.modal);
    this.modal = '';

    const dialogo1 = this.dialog.open(TratamientoCrudComponent, {
      data: (this.nuevoTratamiento = { 
        // id: null,
         detalle: '', 
         precio: '',
        }),
    });

    dialogo1.afterClosed().subscribe((tratam) => {
      this.loading = true;

      try {
        if (tratam) {
          this.tratamientoService.create(tratam).subscribe(() => {
            this.tratamientoService.showMessage('Creado con éxito!');
            this.router.navigate(['/tratamiento']);
            this.cargarList();
          });
        } else {
          this.cargarList();
        }
      } catch (error) {}
    });
  }

  updateDialog(tratam: Tratamiento) {
    this.modal = 'update';
    sessionStorage.removeItem('modal');
    sessionStorage.setItem('modal', this.modal);
    this.modal = '';
    this.editTratamiento = tratam;

    const dialogo1 = this.dialog.open(TratamientoCrudComponent, {
      data: this.editTratamiento,
    });

    dialogo1.afterClosed().subscribe((tratam) => {
      this.loading = true;

      try {
        if (tratam) {
          this.tratamientoService.update(tratam).subscribe(() => {
            this.tratamientoService.showMessage('Datos actualizados!');
            this.router.navigate(['/tratamiento']);
          });
        } else {
          this.cargarList();
        }
      } catch (error) {
        
      }


      
    });
  }

  detailDialog(tratam: Tratamiento) {
    this.modal = 'detail';
    sessionStorage.removeItem('modal');
    sessionStorage.setItem('modal', this.modal);
    this.modal = '';
    this.editTratamiento = tratam;

    const dialogo1 = this.dialog.open(TratamientoCrudComponent, {
      data: this.editTratamiento,
    });
  }

  borrarFila(tratam: Tratamiento) {
    this.modal = 'delete';
    sessionStorage.removeItem('modal');
    sessionStorage.setItem('modal', this.modal);
    this.modal = '';
    this.editTratamiento = tratam;

    const dialogo1 = this.dialog.open(TratamientoCrudComponent, {
      data: this.editTratamiento,
    });

    dialogo1.afterClosed().subscribe((tratam) => {
      this.loading = true;
      if (tratam) {
        this.tratamientoService.delete(tratam.id).subscribe(() => {
          this.tratamientoService.showMessage('Eliminado con exito');
          this.router.navigate(['/tratamiento']);
          this.cargarList();
        });
      }else {
        this.cargarList();
      }
    });
  }


 cargarList(){
  this.tratamientoService.read().subscribe((dg) => {
    this.tratamientos = dg;
    this.loading = false;
  });
  
 }


} //
