import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Cliente } from 'src/app/models/cliente.model';
import { Tratamiento } from 'src/app/models/tratamiento.model';
import { TratamientoService } from 'src/app/services/tratamiento.service';

@Component({
  selector: 'app-tratamiento-crud',
  templateUrl: './tratamiento-crud.component.html',
  styleUrls: ['./tratamiento-crud.component.css'],
})
export class TratamientoCrudComponent implements OnInit {
  mCreate: boolean;
  mUpdate: boolean;
  mDelete: boolean;
  mDetail: boolean;
  valorModal: any;

  constructor(
    private tratamientoService: TratamientoService,
    public dialogRef: MatDialogRef<TratamientoCrudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Tratamiento
  ) {
    this.valorModal = sessionStorage.getItem('modal');
    this.data = { ...data };
    this.mCreate = false;
    this.mDelete = false;
    this.mDetail = false;
    this.mUpdate = false;
  }

  ngOnInit(): void {
    switch (this.valorModal) {
      case 'create':
        this.mCreate = true;
        this.mDelete = false;
        this.mUpdate = false;
        this.mDetail = false;
        break;

      case 'update':
        this.mCreate = false;
        this.mDelete = false;
        this.mUpdate = true;
        this.mDetail = false;
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
        break;
    }
  }

  cancelar() {
    this.dialogRef.close();
  }

  validar(data: Tratamiento): boolean {
    if (data.detalle == '' || data.detalle == null) {
      document.getElementById('detalle')!.focus();
      this.tratamientoService.showMessage(
        'El nombre no puede estar vacío',
        true
      );
      return false;
    }

    if (data.precio == '' || data.precio == null) {
      document.getElementById('precio')!.focus();
      this.tratamientoService.showMessage(
        'Este campo no puede estar vacío',
        true
      );
      return false;
    }

    return true;
  }

  submit(data: Tratamiento) {
    if (this.validar(data)) {
      this.dialogRef.close(data);
    }
  }
}
