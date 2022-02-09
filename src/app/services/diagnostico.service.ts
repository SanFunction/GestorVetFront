import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Diagnostico } from '../models/diagnostico.model';
import { Veterinario } from '../models/veterinario.model';


@Injectable({
  providedIn: 'root'
})
export class DiagnosticoService {
  baseUrl = "http://localhost:8080/diagnostico";

  baseUrl2 = "http://localhost:8080/diagnostico/veterinario";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  create(diagnostico: Diagnostico): Observable<Diagnostico> {
    return this.http.post<Diagnostico>(this.baseUrl, diagnostico).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  getVetporIdDiagnostico(id:any):Observable<Veterinario>{
    const url2 = `${this.baseUrl2}/${id}`;
    return this.http.get<Veterinario>(url2).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  read(): Observable<Diagnostico[]> {
    return this.http.get<Diagnostico[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<Diagnostico> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Diagnostico>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(diagnostico: Diagnostico): Observable<Diagnostico> {
    const url = `${this.baseUrl}/${diagnostico.id}`;
    return this.http.put<Diagnostico>(url, diagnostico).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Diagnostico> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Diagnostico>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage("Ocurrio un error", true);
    return EMPTY;
  }
}
