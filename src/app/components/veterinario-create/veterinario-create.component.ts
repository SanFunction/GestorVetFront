import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Veterinario } from 'src/app/models/veterinario.model';
import { VeterinarioService } from 'src/app/services/veterinario.service';
import { VeterinarioComponent } from 'src/app/views/veterinario/veterinario.component';

@Component({
  selector: 'app-veterinario-create',
  templateUrl: './veterinario-create.component.html',
  styleUrls: ['./veterinario-create.component.css'],
})
export class VeterinarioCreateComponent implements OnInit {
  mCreate: boolean;
  mUpdate: boolean;
  mDelete: boolean;
  mDetail: boolean;
  valorModal: any;

  constructor(
    private veterinarioService: VeterinarioService,
    public dialogRef: MatDialogRef<VeterinarioCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Veterinario
  ) {
    this.mCreate = false;
    this.mUpdate = false;
    this.mDelete = false;
    this.mDetail = false;

    this.valorModal = sessionStorage.getItem('modal');
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

  validar(data: Veterinario): boolean {
    if (data.nombre == '' || data.nombre == null) {
      document.getElementById('nombre')!.focus();
      this.veterinarioService.showMessage(
        'El nombre no puede estar vacío',
        true
      );
      return false;
    }

    if (data.apellidos == '' || data.apellidos == null) {
      document.getElementById('apellidos')!.focus();
      this.veterinarioService.showMessage(
        'Este campo no puede estar vacío',
        true
      );
      return false;
    }

    return true;
  }

  submit(data: Veterinario) {
    if (this.validar(data)) {
      this.dialogRef.close(data);
    }
  }
}
