import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Cita } from '../models/cita.model';
import { Observable, EMPTY } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Event } from '../models/event.model';
import { DayPilot } from '@daypilot/daypilot-lite-angular';

@Injectable({
  providedIn: 'root',
})
export class CitaService {
  baseUrl = 'http://localhost:8080/cita';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  create(cita: any): Observable<Cita> {
    return this.http.post<Cita>(this.baseUrl, cita).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  read(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  readById(id: any): Observable<Cita> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Cita>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(cita: Cita): Observable<Cita> {
    const url = `${this.baseUrl}/${cita.id}`;
    return this.http.put<Cita>(url, cita).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<Cita> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Cita>(url).pipe(
      map((obj) => obj),
      catchError((e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    this.showMessage('Ocurrio un error', true);
    return EMPTY;
  }
}
