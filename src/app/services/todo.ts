import { inject, Injectable, signal } from '@angular/core';
import { TodoModel } from '../models/todo-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Main } from './main';

@Injectable({
  providedIn: 'root',
})
export class Todo {
  private mainService = inject(Main);

  todos = signal<TodoModel[]>([]);

  constructor() {}

  ngOninit(): void {
    this.getTodos();
  }

  getTodos() {
    this.mainService.getTodos().subscribe({
      next: (todo) => {
        this.todos.set(todo);
        console.log('Todos loaded:', todo);
      },
      error: (error) => {
        console.error('Error loading todos:', error);
      },
    });
  }

  updateTodo(todo: TodoModel): void {
    this.mainService.updateTodo(todo).subscribe((updatedTodo) => {
      const index = this.todos().findIndex((t) => t.id === updatedTodo.id);
      if (index !== -1) {
        this.todos.update((todos) => {
          todos[index] = updatedTodo;
          return todos;
        });
      }
    });
  }

  addTodo(todo: TodoModel): void {
    this.mainService.addTodo(todo).subscribe((newTodo) => {
      this.todos.update((todos) => [...todos, newTodo]);
    });
  }

  deleteTodo(id: number): void {
    this.mainService.deleteTodo(id).subscribe(() => {
      this.todos.update((todos) => todos.filter((todo) => todo.id !== id));
    });
  }

  toggleTodo(id: number): void {
    const todo = this.todos().find((todo) => todo.id === id);

    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  clearCompleted(): void {
    this.mainService.clearCompleted().subscribe(() => {
      this.todos.update((todos) => todos.filter((todo) => !todo.completed));
    });
  }

  totalTodos(): number {
    return this.todos().length;
  }

  totalCompleted(): number {
    const completed = this.todos().filter((todo) => todo.completed);
    return completed.length;
  }

  overdueTodos(): number {
    const today = new Date();
    const overdue = this.todos().filter(
      (todo) => !todo.completed && todo.dueDate && new Date(todo.dueDate) < today,
    );
    return overdue.length;
  }

  activeTodos(): number {
    const active = this.todos().filter((todo) => !todo.completed);
    return active.length;
  }

  get todaysTodos(): TodoModel[] {
    const today = new Date();
    return this.todos().filter((todo) => {
      const dueDate = new Date(todo.dueDate);
      return (
        !todo.completed &&
        dueDate.getFullYear() === today.getFullYear() &&
        dueDate.getMonth() === today.getMonth() &&
        dueDate.getDate() === today.getDate()
      );
    });
  }

  get completedToday(): number {
    return this.todaysTodos.filter((todo) => todo.completed).length;
  }

  get remainingToday(): number {
    return this.todaysTodos.filter((todo) => !todo.completed).length;
  }

  get totalToday(): number {
    return this.todaysTodos.length;
  }

  get todaysProgress(): number {
    if (this.totalToday === 0) return 0;

    return Math.round((this.completedToday / this.totalToday) * 100);
  }
}
