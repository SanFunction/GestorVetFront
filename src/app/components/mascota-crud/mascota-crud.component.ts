import { Component, Inject, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  selectedValue: any = '';
  selectedFile: any ='Sin foto';
  valorModal: any;
  especie: Especie[];
  idCliente: number;
  longitud: any;

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
    this.especie = [];
    this.comboEspecie();
    this.idCliente = Number(this.data.cliente);
    this.longitud = this.data.diagnostico;
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
        console.log(typeof(this.data.foto))
        this.selectedFile = this.data.foto;
        this.selectedValue = this.data.especie;
        console.log(this.selectedFile)
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
        this.selectedFile = this.data.foto;
        
        console.log(this.data.foto)
        break;
    }
  }

  comboEspecie() {
    this.especieService
      .getAllEsp()
      .pipe(take(1))
      .subscribe((data) => {
        this.especie = data;
      });
  }

  cancelar() {
    this.dialogRef.close();
  }

  
  onFileChanged(event:any) {
    this.selectedFile = event.target.files[0].name;
    
    
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
    
    if(this.selectedFile == null || this.selectedFile =='' || this.selectedFile=='Sin foto'){

      this.selectedFile = 'paw.jpg';

    }
    data.foto = this.selectedFile;
    data.especie = this.selectedValue;
    data.cliente = { id: this.idCliente };

    
    if (this.validar(data)) {
      this.dialogRef.close(data);
    }
  }
}
