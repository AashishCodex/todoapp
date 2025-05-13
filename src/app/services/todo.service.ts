import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // Change this to your local API URL
  // private apiUrl = 'https://6822e5f0b342dce8004fc47b.mockapi.io/api/v1/todolist';
  private apiUrl = 'https://6822e5f0b342dce8004fc47b.mockapi.io/api/v1/users/1/todos';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        return response as Todo[];
      })
    );
  }

  // You might need to adjust createTodo, updateTodo, and deleteTodo
  // depending on how you implement those endpoints in your simple Node.js API.
  // For now, I'll leave them as they are, but keep in mind they might not work
  // with your simple local API without further modifications.
  createTodo(todo: Partial<Todo>): Observable<Todo> {
    return this.http.post<Todo>(`${this.apiUrl}/add`, todo, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.apiUrl}/${todo.id}`, todo, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => {
        // DummyJSON delete returns the deleted todo, we can just return it
        return response;
      })
    );
  }
}
