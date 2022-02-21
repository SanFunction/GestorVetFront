import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Tratamiento } from '../models/tratamiento.model';

@Injectable({
  providedIn: 'root',
})
export class TratamientoService {
  baseUrl = 'http://localhost:8080/tratamiento';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  create(tratamiento: Tratamiento): Observable<Tratamiento> {
    return this.http.post<Tratamiento>(this.baseUrl, tratamiento).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  read(): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: number): Observable<Tratamiento> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Tratamiento>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(tratamiento: Tratamiento): Observable<Tratamiento> {
    const url = `${this.baseUrl}/${tratamiento.id}`;
    return this.http.put<Tratamiento>(url, tratamiento).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Tratamiento> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Tratamiento>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocurrio un error', true);
    return EMPTY;
  }
}
