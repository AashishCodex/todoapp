import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-create-todo-modal',
  templateUrl: './create-todo-modal.component.html',
  styleUrls: ['./create-todo-modal.component.css'],
  imports: [FormsModule,MatCardModule, MatButtonModule, MatDividerModule,MatFormFieldModule, MatInputModule, MatIconModule],
})
export class CreateTodoModalComponent {
  @Input() showModal: boolean = false;
  @Output() close = new EventEmitter<void>();

  title: string = '';
  description: string = '';

  constructor(private todoService: TodoService, public dialogRef : MatDialogRef<CreateTodoModalComponent>) { }

  createTodo() {
    const newTodo = { title: this.title, description: this.description, status: 'Pending', userId: 1 }; // Assuming 'Pending' is the initial status
    this.todoService.createTodo(newTodo).subscribe(
      () => this.closeModal()
    );
  }

  closeModal() {
    this.dialogRef.close()
  }
}