import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-crud',
  templateUrl: './cliente-crud.component.html',
  styleUrls: ['./cliente-crud.component.css'],
})
export class ClienteCrudComponent implements OnInit {
  mCreate: boolean;
  mUpdate: boolean;
  mDelete: boolean;
  mDetail: boolean;
  valorModal: any;

  constructor(
    private clienteService: ClienteService,
    public dialogRef: MatDialogRef<ClienteCrudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente
  ) {
    this.mCreate = false;
    this.mUpdate = false;
    this.mDelete = false;
    this.mDetail = false;
    this.valorModal = '';

    this.valorModal = sessionStorage.getItem('modal');
    
    this.data = { ...data };
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

  validar(data: Cliente): boolean {
    if (data.nombre == '' || data.nombre == null) {
      document.getElementById('nombre')!.focus();
      this.clienteService.showMessage('El nombre no puede estar vacío', true);
      return false;
    }

    if (data.descripcion == '' || data.descripcion == null) {
      document.getElementById('descripcion')!.focus();
      this.clienteService.showMessage('Este campo no puede estar vacío', true);
      return false;
    }

    if (data.telefono == '' || data.telefono == null) {
      document.getElementById('telefono')!.focus();
      this.clienteService.showMessage('El teléfono no puede estar vacío', true);
      return false;
    }

    if (Number.isNaN(parseInt(data.telefono))) {
      document.getElementById('telefono')!.focus();
      this.clienteService.showMessage('Debe introducir un número', true);
      return false;
    }

    return true;
  }

  submit(data: Cliente) {
    if (this.validar(data)) {
      this.dialogRef.close(data);
    }
  }
} //clase
