import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mascota } from 'src/app/models/mascota.model';

@Component({
  selector: 'app-mascota-crud',
  templateUrl: './mascota-crud.component.html',
  styleUrls: ['./mascota-crud.component.css']
})
export class MascotaCrudComponent implements OnInit {

  mCreate: boolean;
  mUpdate: boolean;
  mDelete: boolean;
  mDetail: boolean;
  valorModal: any;

  constructor(public dialogRef: MatDialogRef<MascotaCrudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Mascota) {

      this.valorModal = sessionStorage.getItem("modal");
      this.mCreate=false;
      this.mDelete=false;
      this.mDetail=false;
      this.mUpdate=false;

     }

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
