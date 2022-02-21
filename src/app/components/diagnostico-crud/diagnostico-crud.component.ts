import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { Diagnostico } from 'src/app/models/diagnostico.model';
import { Mascota } from 'src/app/models/mascota.model';
import { Tratamiento } from 'src/app/models/tratamiento.model';
import { Veterinario } from 'src/app/models/veterinario.model';
import { DiagnosticoService } from 'src/app/services/diagnostico.service';
import { TratamientoService } from 'src/app/services/tratamiento.service';
import { VeterinarioService } from 'src/app/services/veterinario.service';

@Component({
  selector: 'app-diagnostico-crud',
  templateUrl: './diagnostico-crud.component.html',
  styleUrls: ['./diagnostico-crud.component.css'],
})
export class DiagnosticoCrudComponent implements OnInit {
  mCreate: boolean;
  mUpdate: boolean;
  mDelete: boolean;
  mDetail: boolean;
  estado: any[];
  selectedValueTrat: any = '';
  selectedValueVet: any = '';
  estadoSelected: any = '';
  valorModal: any;
  veterinario: Veterinario[];
  tratamiento: Tratamiento[];
  mascota: any;
  nombreVet: any;
  id: any;

  constructor(
    private tratamientoService: TratamientoService,
    private veterinarioService: VeterinarioService,
    private diagnosticoService: DiagnosticoService,
    public dialogRef: MatDialogRef<DiagnosticoCrudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Diagnostico
  ) {
    this.valorModal = sessionStorage.getItem('modal');
    this.mCreate = false;
    this.mDelete = false;
    this.mUpdate = false;
    this.mDetail = false;
    this.data = { ...data };
    this.id = sessionStorage.getItem('idMascota');
    this.veterinario = [];
    this.tratamiento = [];
    this.mascota = {
      id: Number(this.id),
    };

    this.estado = [
      { name: 'En curso', id: 2 },
      { name: 'Cerrado', id: 3 },
      { name: 'Re-abierto', id: 4 },
      { name: 'Apertura', id: 1 },
    ];
  }

  ngOnInit(): void {
    switch (this.valorModal) {
      case 'create':
        this.mCreate = true;
        this.mDelete = false;
        this.mUpdate = false;
        this.mDetail = false;
        this.comboVeterinario();
        this.comboTratamientos();
        this.data.mascota = this.mascota;

        break;

      case 'update':
        this.getVetIdDiagnostico();
        this.mCreate = false;
        this.mDelete = false;
        this.mUpdate = true;
        this.mDetail = false;
        this.comboVeterinario();
        this.comboTratamientos();
        this.selectedValueTrat = this.data.tratamiento;
        this.getVetIdDiagnostico();
        this.data.mascota = this.mascota;
        this.data.estado = this.estadoSelected;
        break;

      case 'delete':
        this.mCreate = false;
        this.mDelete = true;
        this.mUpdate = false;
        this.mDetail = false;
        break;

      case 'detail':
        this.mCreate = false;
        this.mDelete = false;
        this.mUpdate = false;
        this.mDetail = true;
        this.getVetIdDiagnostico();

        break;
    }
  }

  cancelar() {
    this.dialogRef.close();
  }

  comboVeterinario() {
    this.veterinarioService
      .getAllVet()
      .pipe(take(1))
      .subscribe((data) => {
        this.veterinario = data;
      });
  }

  comboTratamientos() {
    this.tratamientoService
      .read()
      .pipe(take(1))
      .subscribe((data) => {
        this.tratamiento = data;
      });
  }

  validar(data: Diagnostico): boolean {
    const RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;

    if (data.enfermedad == '' || data.enfermedad == null) {
      document.getElementById('enfermedad')!.focus();
      this.diagnosticoService.showMessage(
        'El nombre no puede estar vacío',
        true
      );
      return false;
    }

    if (data.fecha == '' || data.fecha == null) {
      document.getElementById('fecha')!.focus();
      this.diagnosticoService.showMessage(
        'Este campo no puede estar vacío',
        true
      );

      return false;
    }

    if (!data.fecha.match(RegExPattern)) {
      document.getElementById('fecha')!.focus();
      this.diagnosticoService.showMessage('Formato de fecha incorrecto', true);

      return false;
    } else {
      let anio = data.fecha!.substring(6, 10);
      let mes = data.fecha!.substring(3, 5);
      let dia = data.fecha!.substring(0, 2);

      data.fecha = new Date(`${anio}-${mes}-${dia}`).toISOString();
    }

    if (data.estado == '' || data.estado == null) {
      document.getElementById('estado')!.focus();
      this.diagnosticoService.showMessage(
        'Este campo no puede estar vacío',
        true
      );
      return false;
    }

    if (data.tratamiento == '' || data.tratamiento == null) {
      // document.getElementById('tratamiento')!.focus();
      this.diagnosticoService.showMessage(
        'Este campo no puede estar vacío',
        true
      );
      return false;
    }
    return true;
  }

  cambiarFecha() {
    const aux = this.data.fecha;

    let anio = aux?.substring(0, 4);
    let mes = aux?.substring(5, 7);
    let dia = aux?.substring(8, 10);

    this.data.fecha = `${dia}/${mes}/${anio}`;
  }

  getVetIdDiagnostico() {
    this.diagnosticoService
      .getVetporIdDiagnostico(this.data.id)
      .subscribe((v) => {
        this.data.veterinario = v;
        this.nombreVet = this.data.veterinario.nombre;
        if (!this.selectedValueVet) {
          this.selectedValueVet = v.id;
        }
      });
  }

  submit(data: Diagnostico) {
    data.veterinario = { id: this.selectedValueVet };
    data.estado = this.estadoSelected;
    data.tratamiento = this.selectedValueTrat;
    if (this.validar(data)) {
      // data.veterinario = { id: 1 };
      data.mascota = this.mascota;
      this.dialogRef.close(data);
    }
  }
}
