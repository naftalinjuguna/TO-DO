import { Component, inject } from '@angular/core';
import { TodoList } from '../todo-list/todo-list';
import { DatePipe } from '@angular/common';
import { Todo } from '../../services/todo';

@Component({
  selector: 'app-dashboard',
  imports: [TodoList, DatePipe],
  templateUrl: './dashboard.html',
})
export class Dashboard {

  private todoService = inject(Todo);
  
  ngOnInit() {
    this.getToday();
    this.getCurrentTime();
  }

  getToday(): Date {
    return new Date();
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString();
  }

  getTotalTodos(): number {
    return this.todoService.totalTodos();
  }

  getTotalToday(): number {
    return this.todoService.totalToday;
  }

  getCompletedToday(): number {
    return this.todoService.completedToday;
  }

  getRemainingToday(): number {
    return this.todoService.remainingToday;
  }
  getTodaysProgress(): number {
    return this.todoService.todaysProgress;
  }

}
