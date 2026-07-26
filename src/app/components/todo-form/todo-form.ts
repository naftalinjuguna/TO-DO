import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Todo } from '../../services/todo';
import { TodoModel } from '../../models/todo-model';

@Component({
  selector: 'app-todo-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css',
})
export class TodoForm implements OnChanges {
  todoForm;
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private todoService: Todo,
  ) {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
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

    if (this.isEditing && this.selectedTodo) {
      this.todoService.updateTodo({
        id: this.selectedTodo.id,
        title: this.todoForm.value.title,
        completed: this.selectedTodo.completed,
      });

      this.isEditing = false;
      this.selectedTodo = null;
    } else {
      this.todoService.addTodo({
        id: Date.now(),
        title: this.todoForm.value.title,
        completed: false,
      });
    }

    this.todoForm.reset();
  }
}
