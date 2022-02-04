import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";

import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Veterinario } from "../models/veterinario.model";

@Injectable({
  providedIn: "root",
})
export class VeterinarioService {
  baseUrl = "http://localhost:8080/veterinario";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  create(veterinario: Veterinario): Observable<Veterinario> {
    return this.http.post<Veterinario>(this.baseUrl, veterinario)
    .pipe(
        map((obj) => obj),
        catchError((e) => this.errorHandler(e))
    );
  }

  read(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  public getAllVet(): Observable<any[]> {
    return this.http.get<Veterinario[]>(`${this.baseUrl}`);
  }

  readById(id: number): Observable<Veterinario> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Veterinario>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(veterinario: Veterinario): Observable<Veterinario> {
    const url = `${this.baseUrl}/${veterinario.id}`;
    return this.http.put<Veterinario>(url, veterinario).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Veterinario> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Veterinario>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocurrio un error", true);
    return EMPTY;
  }
}
