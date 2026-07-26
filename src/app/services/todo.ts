import { Injectable } from '@angular/core';
import { TodoModel } from '../models/todo-model';

@Injectable({
  providedIn: 'root',
})
export class Todo {
  todos: TodoModel[] = [];

  constructor() {
    this.loadTodos();
  }

  getTodos(): TodoModel[] {
    return this.todos;
  }

  addTodo(todo: TodoModel): void {
    this.todos.push(todo);
    this.saveTodos();
  }

  deleteTodo(id: number): void {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.saveTodos();
    }
  }

  toggleTodo(id: number): void {
    const todo = this.todos.find((todo) => todo.id === id);

    if (todo) {
      todo.completed = !todo.completed;
      this.saveTodos();
    }
  }

  private saveTodos(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  private loadTodos(): void {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      this.todos = JSON.parse(storedTodos);
    }
  }

  clearCompleted(): void {
    this.todos = this.todos.filter((todo) => !todo.completed);
    this.saveTodos();
  }

  updateTodo(updatedTodo: TodoModel): void {
    const todo = this.todos.find((t) => t.id === updatedTodo.id);
    if (todo) {
      todo.title = updatedTodo.title;
      todo.completed = updatedTodo.completed;
      this.saveTodos();
    }
  }
}
