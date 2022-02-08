import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { Especie } from 'src/app/models/especie.model';
import { Mascota } from 'src/app/models/mascota.model';
import { EspecieService } from 'src/app/services/especie.service';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-mascota-crud',
  templateUrl: './mascota-crud.component.html',
  styleUrls: ['./mascota-crud.component.css'],
})
export class MascotaCrudComponent implements OnInit {
  mCreate: boolean;
  mUpdate: boolean;
  mDelete: boolean;
  mDetail: boolean;
  selectedValue: string ='';
  valorModal: any;
  especie: Especie[];

  constructor(
    private especieService: EspecieService,
    private mascotaService: MascotaService,
    public dialogRef: MatDialogRef<MascotaCrudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Mascota
  ) {
    this.valorModal = sessionStorage.getItem('modal');
    this.mCreate = false;
    this.mDelete = false;
    this.mDetail = false;
    this.mUpdate = false;
    this.data = { ...data };
    this.especie=[];
    this.comboEspecie();
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


  comboEspecie(){
    this.especieService
    .getAllEsp()
    .pipe(take(1))
    .subscribe((data) => {
      console.log('data:',data)
      this.especie = data;
      console.log('especie:',this.especie)
      // this.loading = false
    });

  }



  cancelar() {
    this.dialogRef.close();
  }

  validar(data: Mascota): boolean {
    if (data.nombre == '' || data.nombre == null) {
      document.getElementById('nombre')!.focus();
      this.mascotaService.showMessage('El nombre no puede estar vacío', true);
      return false;
    }

    if (data.especie == '' || data.especie == null) {
      document.getElementById('especie')!.focus();
      this.mascotaService.showMessage('Este campo no puede estar vacío', true);
      return false;
    }

    if (data.edad == '' || data.edad == null) {
      document.getElementById('edad')!.focus();
      this.mascotaService.showMessage('Debe introducir edad aproximada', true);
      return false;
    }

    if (data.peso == '' || data.peso == null) {
      document.getElementById('peso')!.focus();
      this.mascotaService.showMessage('Debe introducir peso aproximado', true);
      return false;
    }
    

    return true;
  }


  submit(data: Mascota) {
    data.especie = this.selectedValue;

    if (this.validar(data)) {
      this.dialogRef.close(data);
    }
  }








}
