import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MascotaCrudComponent } from 'src/app/components/mascota-crud/mascota-crud.component';

import { HeaderService } from 'src/app/components/template/header/header.service';
import { Mascota } from 'src/app/models/mascota.model';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-mascota',
  templateUrl: './mascota.component.html',
  styleUrls: ['./mascota.component.css']
})
export class MascotaComponent implements OnInit {

 
  mascotas: Mascota[]
  displayedColumns = ['id', 'nombre', 'raza','edad','action']
  nuevoMascota: Mascota;
  editMascota: Mascota;
  modal: string;

  constructor(private tratamientoService: MascotaService,
    private router: Router, 
    private headerService: HeaderService,
    public dialog: MatDialog) {
    headerService.headerData = {
      title: 'Listado de mascota',
      icon: 'storefront',
      routeUrl: '/mascota/:id'
    };

    this.modal = "";
this.editMascota={};
    this.nuevoMascota = {};
    this.mascotas = [
      {
        id: 1,
        nombre: "Mascota1",
        raza:"felino",
        edad: "2"
      },
    ];

  }

  ngOnInit(): void {
    this.tratamientoService.read().subscribe(m => {
      this.mascotas = m
    })




  }



  abrirDialogo() {
    this.modal = "create";
    sessionStorage.removeItem("modal");
    sessionStorage.setItem("modal", this.modal);
    this.modal = "";

    const dialogo1 = this.dialog.open(MascotaCrudComponent, {
      data: (this.nuevoMascota = { }),
    });

    dialogo1.afterClosed().subscribe((vet) => {
      console.log(vet);
      if (vet != undefined) this.agregar(vet);
    });
  }

  updateDialog(vet: Mascota) {
    this.modal = "update";
    sessionStorage.removeItem("modal");
    sessionStorage.setItem("modal", this.modal);
    this.modal = "";
    this.editMascota = vet;

    const dialogo1 = this.dialog.open(MascotaCrudComponent, {
      data: (this.editMascota)
    });

    dialogo1.afterClosed().subscribe((vet) => {
      if (vet != undefined) this.update(vet);
    });
  }

  detailDialog(vet: Mascota) {
    this.modal = "detail";
    sessionStorage.removeItem("modal");
    sessionStorage.setItem("modal", this.modal);
    this.modal = "";
    this.editMascota = vet;

    const dialogo1 = this.dialog.open(MascotaCrudComponent, {
      data: (this.editMascota)
    });

  
  }


  borrarFila(vet: Mascota) {
    this.modal = "delete";
    sessionStorage.removeItem("modal");
    sessionStorage.setItem("modal", this.modal);
    this.modal = "";
    this.editMascota = vet;

    console.log("valor recibido:", vet);
    const dialogo1 = this.dialog.open(MascotaCrudComponent, {
      data: (this.editMascota)
    });

    dialogo1.afterClosed().subscribe((vet) => {
      this.mascotas.splice(vet.id, 1);
    });

  }

  agregar(vet: Mascota) {
    this.mascotas.push(this.nuevoMascota);
  }

  update(vet: Mascota) {
    this.mascotas.push(this.nuevoMascota);
  }




}