import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DiagnosticoCrudComponent } from 'src/app/components/diagnostico-crud/diagnostico-crud.component';
import { HeaderService } from 'src/app/components/template/header/header.service';
import { Diagnostico } from 'src/app/models/diagnostico.model';
import { DiagnosticoService } from 'src/app/services/diagnostico.service';


@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.css']
})
export class DiagnosticoComponent implements OnInit {

 
  diagnosticos: Diagnostico[]
  displayedColumns = ['id', 'enfermedad','action']
  nuevoDiagnostico: Diagnostico;
  editDiagnostico: Diagnostico;
  modal: string;
  idDiagnostico: string;

  constructor(
    
    private diagnosticoService: DiagnosticoService,
    private router: Router,
    private headerService: HeaderService,
    public dialog: MatDialog
  ) {
    headerService.headerData = {
      title: 'Listado de diagnosticos',
      icon: 'storefront',
      routeUrl: '/diagnostico'
    };


    this.modal = "";
    this.editDiagnostico={};
    this.idDiagnostico='';

    this.nuevoDiagnostico = {};
    this.diagnosticos = [
      {
        id: 1,
        enfermedad: "Diagnostico1"
      },
    ];

  }

  ngOnInit(): void {
    this.diagnosticoService.read().subscribe(dg => {
      this.diagnosticos = dg
    })
  }



  abrirDialogo() {
    this.modal = "create";
    sessionStorage.removeItem("modal");
    sessionStorage.setItem("modal", this.modal);
    this.modal = "";

    const dialogo1 = this.dialog.open(DiagnosticoCrudComponent, {
      data: (this.nuevoDiagnostico = { 
        // id:null, 
        // enfermedad: "",
        // tratamiento: null,
        // veterinario:null
      }),
    });

    dialogo1.afterClosed().subscribe((diag) => {
     
      this.diagnosticoService.create(diag).subscribe(() => {
        this.diagnosticoService.showMessage('Creado con éxito!')
        this.router.navigate(['/diagnostico'])
      });

    });
  }

  updateDialog(diag: Diagnostico) {
    this.modal = "update";
    sessionStorage.removeItem("modal");
    sessionStorage.setItem("modal", this.modal);
    this.modal = "";
    this.editDiagnostico = diag;

    const dialogo1 = this.dialog.open(DiagnosticoCrudComponent, {
      data: (this.editDiagnostico)
    });

    dialogo1.afterClosed().subscribe((diag) => {
      
      this.diagnosticoService.update(diag).subscribe(() => {
        this.diagnosticoService.showMessage("Datos actualizados!");
        this.router.navigate(["/diagnostico"]);
      });


    });
  }

  detailDialog(diag: Diagnostico) {
    this.modal = "detail";
    sessionStorage.removeItem("modal");
    sessionStorage.setItem("modal", this.modal);
    this.modal = "";
    this.editDiagnostico = diag;

    const dialogo1 = this.dialog.open(DiagnosticoCrudComponent, {
      data: (this.editDiagnostico)
    });

  
  }


  borrarFila(diag: Diagnostico) {
    this.modal = "delete";
    sessionStorage.removeItem("modal");
    sessionStorage.setItem("modal", this.modal);
    this.modal = "";
    this.editDiagnostico = diag;

    const dialogo1 = this.dialog.open(DiagnosticoCrudComponent, {
      data: (this.editDiagnostico)
    });

    dialogo1.afterClosed().subscribe((diag) => {
      this.diagnosticoService.delete(diag.id).subscribe(() => {
        this.diagnosticoService.showMessage("Eliminado con exito");
        this.router.navigate(["/diagnostico"]);
      });



    });

  }

  agregar(diag: Diagnostico) {
    this.diagnosticos.push(this.nuevoDiagnostico);
  }

  update(diag: Diagnostico) {
    this.diagnosticos.push(this.nuevoDiagnostico);
  }

    navigateToMascotaCrud(diag : Diagnostico): void {

     

      // this.idDiagnostico = (diag.id).toString();

     
      //  console.log(this.idDiagnostico);
      //  sessionStorage.setItem('idDiagnostico',this.idDiagnostico);

    this.router.navigate(['/mascota/{id}'])
  }



}