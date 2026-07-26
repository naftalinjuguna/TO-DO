import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoForm } from './components/todo-form/todo-form';
import { TodoList } from './components/todo-list/todo-list';
import { TodoModel } from './models/todo-model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodoForm, TodoList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo');

  selectedTodo: TodoModel | null = null;

  onEdit(todo: TodoModel) {
    this.selectedTodo = todo;
  }
}
