import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { Todo } from '../../services/todo';
import { TodoModel } from '../../models/todo-model';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule],
  templateUrl: './todo-list.html',
})
export class TodoList implements OnInit {
  private todoService = inject(Todo);

  constructor() {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): TodoModel[] {
    return this.todoService.todos();
  }

  todos = signal(this.todoService.todos());

  @Output() edit = new EventEmitter<TodoModel>();

  editTodo(todo: TodoModel) {
    this.edit.emit(todo);
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
}
