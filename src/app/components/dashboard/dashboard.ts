import { Component } from '@angular/core';
import { TodoList } from '../todo-list/todo-list';

@Component({
  selector: 'app-dashboard',
  imports: [TodoList],
  templateUrl: './dashboard.html',
})
export class Dashboard {

}
