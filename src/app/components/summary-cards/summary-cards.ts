import { Component, input } from '@angular/core';
import { LucideListTodo } from '@lucide/angular';

@Component({
  selector: 'app-summary-cards',
  imports: [LucideListTodo],
  templateUrl: './summary-cards.html',
})
export class SummaryCards {
  completed = input();
  total = input();
  active = input();
  overdue = input();

  cards = [
    {
      title: 'Total Tasks',
      value: this.total,
      icon: 'lucideListTodo',
    },
    {
      title: 'Completed Tasks',
      value: this.completed,
      icon: 'lucideListTodo',
    },
    {
      title: 'In Progress',
      value: this.active,
      icon: 'lucideListTodo',
    },
    {
      title: 'Overdue Tasks',
      value: this.overdue,
      icon: 'lucideListTodo',
    },
  ];
}
