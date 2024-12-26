import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private url = 'http://localhost:3000/api/todos';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  addTodo(text: string): Observable<any> {
    return this.http.post<any>(this.url, { text });
  }

  toggleTodo(id: number, completed: boolean): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, { completed });
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
}
