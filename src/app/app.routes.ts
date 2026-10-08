import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { TodoForm } from './components/todo-form/todo-form';
import { Dashboard } from './components/dashboard/dashboard';
import { TodoList } from './components/todo-list/todo-list';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'form', component: TodoForm },
  { path: 'list', component: TodoList },
];
