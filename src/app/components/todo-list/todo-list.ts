import { CommonModule } from '@angular/common';
import { Component, EventEmitter, output } from '@angular/core';
import { Todo } from '../../services/todo';
import { TodoModel } from '../../models/todo-model';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList {
  todos: TodoModel[] = [];

  constructor(private todoService: Todo) {
    this.todos = this.todoService.getTodos();
  }

  @output() edit = new EventEmitter<TodoModel>();

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
