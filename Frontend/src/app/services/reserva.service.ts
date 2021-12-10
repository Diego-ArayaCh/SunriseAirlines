import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const BLOG_API_ENDPOINT = `${environment.apiUrl}/api/reserva`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get(`${BLOG_API_ENDPOINT}/get`, httpOptions);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${BLOG_API_ENDPOINT}/get/${id}`);
  }

  getCheckIn(id: string): Observable<any> {
    return this.http.get(`${BLOG_API_ENDPOINT}/getCheck/${id}`);
  }

  create(reserva: any): Observable<any> {
    return this.http.post(`${BLOG_API_ENDPOINT}/create/`, reserva);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${BLOG_API_ENDPOINT}/delete/${id}`);
  }
  

  update(id: string, reserva: any): Observable<any> {
    return this.http.put(`${BLOG_API_ENDPOINT}/update/${id}`,reserva);
  }

  checkIn(id: string, reserva: any): Observable<any> {
    return this.http.put(`${BLOG_API_ENDPOINT}/checkIn/${id}`,reserva);
  }
  
  finalizar(id: string, reserva: any): Observable<any> {
    return this.http.put(`${BLOG_API_ENDPOINT}/update/${id}`,reserva);
  }
}
