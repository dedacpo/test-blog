import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  API = 'https://5d77ed9f1e31aa00149a39aa.mockapi.io'
  getPosts(): Observable<any> {
    return this.http.get<any>(`${this.API}/posts`);
  }
 
}
