import { CommonModule } from '@angular/common';
import { Component, inject, input, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Todo } from '../../services/todo';
import { Category, Priority, TodoModel } from '../../models/todo-model';

@Component({
  standalone: true,
  selector: 'app-todo-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-form.html',
})
export class TodoForm implements OnChanges {
  todoForm;

  private fb: FormBuilder = inject(FormBuilder);

  constructor(private todoService: Todo) {
    this.todoForm = this.fb.nonNullable.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: [this.getToday()],
      dueTime: [this.getCurrentTime()],
      priority: ['LOW' as Priority],
      category: ['Development' as Category],
    });
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  getCurrentTime(): string {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  @Input() selectedTodo: TodoModel | null = null;
  @Input() isEditing: boolean = false; 

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedTodo'] && this.selectedTodo) {
      this.isEditing = true;
      this.todoForm.patchValue({
        title: this.selectedTodo.title,
        description: this.selectedTodo.description,
        dueDate: this.selectedTodo.dueDate.toISOString().split('T')[0],
        dueTime: this.selectedTodo.dueTime,
        priority: this.selectedTodo.priority,
        category: this.selectedTodo.category,
      });
    }
  }

  addTodo() {
    if (this.todoForm.invalid) return;

    const formData = this.todoForm.getRawValue();

    if (this.isEditing && this.selectedTodo) {
      this.todoService.updateTodo({
        id: this.selectedTodo.id,
        ...formData,
        dueDate: new Date(formData.dueDate),
        completed: this.selectedTodo.completed,
      });

      this.isEditing = false;
      this.selectedTodo = null;
    } else {
      const todo: TodoModel = {
        id: Date.now(),
        ...formData,
        dueDate: new Date(formData.dueDate),
        completed: false,
      };

      this.todoService.addTodo(todo);
    }

    this.todoForm.reset({
      title: '',
      description: '',
      dueDate: this.getToday(),
      dueTime: this.getCurrentTime(),
      priority: 'LOW' as Priority,
      category: 'OTHER' as Category,
    });
  }
}
