import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { Especie } from "../models/especie.model";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class EspecieService {
  baseUrl = "http://localhost:8080/especie";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  public getAllEsp(): Observable<any[]> {
    return this.http.get<Especie[]>(`${this.baseUrl}`);
  }


  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocurrio un error", true);
    return EMPTY;
  }
}
