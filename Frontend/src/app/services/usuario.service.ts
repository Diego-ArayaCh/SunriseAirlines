import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const BLOG_API_ENDPOINT = `${environment.apiUrl}/api/usuario`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    return this.http.get(`${BLOG_API_ENDPOINT}/get/`, httpOptions);
  }
  getUsernames(): Observable<any> {
    return this.http.get(`${BLOG_API_ENDPOINT}/get-usernames/`, httpOptions);
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${BLOG_API_ENDPOINT}/get/${id}`);
  }

  create(usuario: any): Observable<any> {
    return this.http.post(`${BLOG_API_ENDPOINT}/create-client/`, usuario,httpOptions);
  }

  deleteClient(id: string): Observable<any> {
    return this.http.delete(`${BLOG_API_ENDPOINT}/delete-client/${id}`);
  }
  deleteProfile(id: string): Observable<any> {
    return this.http.delete(`${BLOG_API_ENDPOINT}/delete-profile/${id}`);
  }

  editClient(id: string, usuario: any): Observable<any> {
    return this.http.put(`${BLOG_API_ENDPOINT}/update-client/${id}`,usuario);
  }
  editProfile(id: string, usuario: any): Observable<any> {
    return this.http.put(`${BLOG_API_ENDPOINT}/update-profile/${id}`,usuario);
  }

  editState(id: string, usuario: any): Observable<any> {
    return this.http.put(`${BLOG_API_ENDPOINT}/update-client-state/${id}`,usuario);
  }
  signup(usuario: any): Observable<any> {
    return this.http.post(`${BLOG_API_ENDPOINT}/signup`, usuario,httpOptions);
  }
  signIn(usuario: any): Observable<any> {
    return this.http.post(`${BLOG_API_ENDPOINT}/signin`, usuario,httpOptions);
  }

}
