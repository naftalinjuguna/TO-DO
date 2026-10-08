import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { Todo } from '../../services/todo';
import { TodoModel } from '../../models/todo-model';
import { Main } from '../../services/main';
import { Header } from '../header/header';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, Header, RouterLink],
  templateUrl: './todo-list.html',
})
export class TodoList implements OnInit {
  private mainService = inject(Main);
  private todoService = inject(Todo);

  constructor() {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): TodoModel[] {
    this.mainService.getTodos().subscribe({
      next: (todo) => {
        this.todos.set(todo);
      },
      error: (error) => {
        console.error('Failed to load Todos!', error);
      },
    });
    return this.todos();
  }

  todos = signal<TodoModel[]>([]);

  @Output() edit = new EventEmitter<TodoModel>();

  // editTodo(todo: TodoModel) {
  //   this.edit.emit(todo);
  // }

  editTodo(todo: TodoModel) {
    
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
  }

  toggleTodo(id: number) {
    this.todoService.toggleTodo(id);
  }

  clearCompleted() {
    this.todoService.clearCompleted();
  }

  getToday(): Date {
    return new Date();
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString();
  }
}
