import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Todo } from '../../services/todo';
import { Category, Priority, TodoModel } from '../../models/todo-model';

@Component({
  standalone: true,
  selector: 'app-todo-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm implements OnChanges {
  todoForm;
  isEditing = false;

  private fb: FormBuilder = inject(FormBuilder);

  constructor(private todoService: Todo) {
    this.todoForm = this.fb.nonNullable.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: [new Date()],
      dueTime: [''],
      priority:['LOW' as Priority],
      category: ['OTHER' as Category],
    });
  }

  @Input() selectedTodo: TodoModel | null = null;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedTodo'] && this.selectedTodo) {
      this.isEditing = true;
      this.todoForm.patchValue({
        title: this.selectedTodo.title,
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
        completed: this.selectedTodo.completed,
      });

      this.isEditing = false;
      this.selectedTodo = null;
    } else {
      const todo: TodoModel = {
        id: Date.now(),
        ...formData,
        completed: false,
      };

      this.todoService.addTodo(todo);
    }

    this.todoForm.reset({
      title: '',
      description: '',
      dueDate: new Date(),
      dueTime: '',
      priority: 'LOW' as Priority,
      category: 'OTHER' as Category,
    });
  }
}
