import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const BLOG_API_ENDPOINT = `${environment.apiUrl}/api/aeropuerto`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AeropuertoService {
  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get(`${BLOG_API_ENDPOINT}/get`, httpOptions);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${BLOG_API_ENDPOINT}/get/${id}`);
  }

  create(aeropuerto: any): Observable<any> {
    
    return this.http.post(`${BLOG_API_ENDPOINT}/create/`, aeropuerto);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${BLOG_API_ENDPOINT}/delete/${id}`);
  } 

  update(id: string, aeropuerto: any): Observable<any> {
    return this.http.put(`${BLOG_API_ENDPOINT}/update/${id}`,aeropuerto);
  }
  updateState(id: string, aeropuerto: any): Observable<any> {
    return this.http.put(`${BLOG_API_ENDPOINT}/updateState/${id}`,aeropuerto);
  }
}