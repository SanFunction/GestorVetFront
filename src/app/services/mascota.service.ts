import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Mascota } from '../models/mascota.model';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Diagnostico } from '../models/diagnostico.model';

@Injectable({
  providedIn: 'root',
})
export class MascotaService {
  baseUrl = 'http://localhost:8080/mascota';
  baseUrl2 = 'http://localhost:8080/mascota/diagnostico';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  create(mascota: Mascota): Observable<Mascota> {
    return this.http.post<Mascota>(this.baseUrl, mascota).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  read(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<Mascota> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Mascota>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  diagnosticoById(id: any): Observable<Diagnostico[]> {
    const url = `${this.baseUrl2}/${id}`;
    return this.http.get<Diagnostico>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }



  update(mascota: Mascota): Observable<Mascota> {
    const url = `${this.baseUrl}/${mascota.id}`;
    return this.http.put<Mascota>(url, mascota).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Mascota> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Mascota>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocurrio un error', true);
    return EMPTY;
  }
}
