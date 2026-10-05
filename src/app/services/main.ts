import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoModel } from '../models/todo-model';

@Injectable({
  providedIn: 'root',
})
export class Main {
  apiUrl = 'http://localhost:3000';

  private http: HttpClient = inject(HttpClient);

  constructor() {}

  getTodos(): Observable<TodoModel[]> {
    return this.http.get<TodoModel[]>(`${this.apiUrl}/todos`);
  }

  addTodo(todo: TodoModel): Observable<TodoModel> {
    return this.http.post<TodoModel>(`${this.apiUrl}/todos`, todo);
  }

  updateTodo(todo: TodoModel): Observable<TodoModel> {
    return this.http.put<TodoModel>(`${this.apiUrl}/todos/${todo.id}`, todo);
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/todos/${id}`);
  }

  clearCompleted(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/completed`);
  }
}
