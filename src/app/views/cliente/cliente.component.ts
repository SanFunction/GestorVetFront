import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HeaderService } from "src/app/components/template/header/header.service";


import { MatDialog } from "@angular/material/dialog";

import { HttpResponse } from "@angular/common/http";
import { Cliente } from "src/app/models/cliente.model";
import { ClienteService } from "src/app/services/cliente.service";
import { ClienteCrudComponent } from "src/app/components/cliente-crud/cliente-crud.component";

@Component({
  selector: "app-cliente",
  templateUrl: "./cliente.component.html",
  styleUrls: ["./cliente.component.css"],
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[];
  displayedColumns = [
    "id",
    "nombre",
    "apellidos",
    "telefono",
    "mascotas",
    "action",
  ];
  nuevoCliente: Cliente;
  editCliente: Cliente;
  modal: string;
  // idCliente: string;


  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private headerService: HeaderService,
    public dialog: MatDialog
  ) {
    headerService.headerData = {
      title: "Listado de clientes",
      icon: "storefront",
      routeUrl: "/cliente",
    };

    this.modal = "";

    this.nuevoCliente = {
      // id:null,
      nombre: "",
      descripcion: "",
      telefono: "",};
    this.clientes = [];
    this.editCliente={};

  }

  ngOnInit(): void {
    this.clienteService.read().subscribe((cl) => {
      this.clientes = cl;
    });
  }

  abrirDialogo() {
    this.modal = "create";
    sessionStorage.removeItem("modal");
    sessionStorage.setItem("modal", this.modal);
    this.modal = "";

    const dialogo1 = this.dialog.open(ClienteCrudComponent, {
      data: (this.nuevoCliente = {
        // id:null,
        nombre: "",
        descripcion: "",
        telefono: "",
      }),
    });

    dialogo1.afterClosed().subscribe((client) => {
      this.clienteService.create(client).subscribe(() => {
        this.clienteService.showMessage("Creado con éxito!");
        this.router.navigate(["/cliente"]);
      });
    });
  }

  updateDialog(client: Cliente) {
    this.modal = "update";
    sessionStorage.removeItem("modal");
    sessionStorage.setItem("modal", this.modal);
    this.modal = "";
    this.editCliente = client;

    const dialogo1 = this.dialog.open(ClienteCrudComponent, {
      data: this.editCliente,
    });

    dialogo1.afterClosed().subscribe((client) => {
      if (client) {
        this.clienteService.update(client).subscribe((response) => {
          if (!response) {
            throw new Error();
          }
          console.log("res", response);
          this.clienteService.showMessage("Datos actualizados!");
          this.router.navigate(["/cliente"]);
        });
      }
    });
  }


  detailDialog(client: Cliente) {
    this.modal = "detail";
    sessionStorage.removeItem("modal");
    sessionStorage.setItem("modal", this.modal);
    this.modal = "";
    this.editCliente = client;

    const dialogo1 = this.dialog.open(ClienteCrudComponent, {
      data: this.editCliente,
    });
  }

  borrarFila(client: Cliente) {
    this.modal = "delete";
    sessionStorage.removeItem("modal");
    sessionStorage.setItem("modal", this.modal);
    this.modal = "";
    this.editCliente = client;

    const dialogo1 = this.dialog.open(ClienteCrudComponent, {
      data: this.editCliente,
    });

    dialogo1.afterClosed().subscribe((client) => {
      if (client) {
        this.clienteService.delete(client.id).subscribe(() => {
          this.clienteService.showMessage("Eliminado con exito");
          this.router.navigate(["/cliente"]);
        });
      }
    });
  }

  navigateToMascotaCrud(client: Cliente): void {
    // this.idCliente = client.id.toString();
    // console.log(this.idCliente);
    // sessionStorage.setItem("idCliente", this.idCliente);

    this.router.navigate(["/mascota"]);
  }
}
