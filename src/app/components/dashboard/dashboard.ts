import { Component, inject, signal } from '@angular/core';
import { TodoList } from '../todo-list/todo-list';
import { DatePipe } from '@angular/common';
import { Todo } from '../../services/todo';
import { SummaryCards } from '../summary-cards/summary-cards';
import { TodoModel } from '../../models/todo-model';
import { Main } from '../../services/main';
import { RouterLink } from '@angular/router';
import { TodoForm } from '../todo-form/todo-form';
import { Header } from '../header/header';

@Component({
  selector: 'app-dashboard',
  imports: [TodoList, DatePipe, SummaryCards, RouterLink, TodoForm, Header],
  templateUrl: './dashboard.html',
})
export class Dashboard {

  private todoService = inject(Todo);
  private mainService = inject(Main);

  todos = signal<TodoModel[]>([]);

  isModalOpen = false;
  isEditting = false;
  selectedTodo: TodoModel | null = null;

  
  ngOnInit() {
    this.getTodos();
    this.getToday();
    this.getCurrentTime();
  }

  getTodos() {
    this.mainService.getTodos().subscribe({
      next: (todo) => {
        this.todos.set(todo);
      },
      error: (error) => {
        console.error('Failed to load Todos!', error);
      }
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

  get totalTodos(): number {
    return this.todos().length;
  }

  get totalCompleted(): number {
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

    return Math.round((this.totalTodos / this.totalCompleted) * 100);
  }



  getToday(): Date {
    return new Date();
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString();
  }

  openModal() {
    this.isModalOpen = true;
  }
  
  closeModal() {
    this.isModalOpen = false;
  }

  recentTodos = signal<TodoModel[]>(this.todaysTodos);


}
