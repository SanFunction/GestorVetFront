import { Component, OnInit } from '@angular/core';
import { take, tap } from 'rxjs';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { Cliente } from 'src/app/models/cliente.model';
import { Mascota } from 'src/app/models/mascota.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-userview',
  templateUrl: './userview.component.html',
  styleUrls: ['./userview.component.css']
})
export class UserviewComponent implements OnInit {

  userPets: any;
  cliente: any;
  nombreCliente: any;


  constructor(
    private mascotaService: MascotaService,
    private clienteService: ClienteService,
    private headerService : HeaderService
  ) { 
    headerService.headerData = {
      title: 'Inicio',
      icon: 'home',
      routeUrl: 'userView',
    };
    this.cliente = {};
    this.userPets = [];
    this.nombreCliente = '';
  }

  ngOnInit(): void {
    this.cargarList();
  }


  async cargarList(){

    // let currentlyUser = Number(localStorage.getItem('user'));
    let currentlyUser = 1;
    
    this.cliente = this.clienteService.readById(currentlyUser)
    .pipe(take(1))
    .subscribe((data)=>{
      this.nombreCliente = data.nombre;
      this.cliente = data;
    });
    
   await this.mascotaService.readById(currentlyUser)
   .pipe(
    take(1))
    .subscribe((data)=>{
     
      this.userPets= data;
      console.log(data.nombre)
      
    });

  }






}
