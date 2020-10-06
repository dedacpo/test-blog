import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/comments/comment.model';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  API = 'https://5d77ed9f1e31aa00149a39aa.mockapi.io'
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.API}/users`);
  }
  getComments(userId: string): Observable<any> {
    return this.http.get<any>(`${this.API}/users/${userId}/comments`);
  }
  postUser(data): Observable<any> {
    return this.http.post<any>(`${this.API}/users/`, data);
  }
  postComment(data): Observable<any> {
    return this.http.post<any>(`${this.API}/users/${data.userId}/comments`, data);
  }
}
