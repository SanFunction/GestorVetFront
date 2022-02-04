import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Diagnostico } from 'src/app/models/diagnostico.model';

@Component({
  selector: 'app-diagnostico-crud',
  templateUrl: './diagnostico-crud.component.html',
  styleUrls: ['./diagnostico-crud.component.css']
})
export class DiagnosticoCrudComponent implements OnInit {

  mCreate: boolean;
  mUpdate: boolean;
  mDelete: boolean;
  mDetail: boolean;
  valorModal: any;

  constructor(public dialogRef: MatDialogRef<DiagnosticoCrudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Diagnostico
  ) {
    this.valorModal = sessionStorage.getItem("modal");
    this.mCreate=false;
    this.mDelete = false;
    this.mUpdate = false;
    this.mDetail=false;
    console.log(data);}

  ngOnInit(): void {

    switch (this.valorModal) {

      case "create":
        this.mCreate = true;
        this.mDelete = false;
        this.mUpdate = false;
        this.mDetail = false;
        break;

      case "update":
        this.mCreate = false;
        this.mDelete = false;
        this.mUpdate = true;
        this.mDetail = false;
        break;

      case "delete":
        this.mCreate = false;
        this.mDelete = true;
        this.mUpdate = false;
        this.mDetail= false;
        break;

      case "detail":
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

}
