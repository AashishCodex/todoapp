import { Component, Input, Output, EventEmitter } from '@angular/core';import { MatDialog } from '@angular/material/dialog';

import { Todo } from '../../models/todo';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { TodoDetailsComponent } from '../todo-details/todo-details.component';


@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css'],
  styles: [],
  imports: [MatCheckboxModule, MatDialogModule, ]
})  
export class TodoCardComponent {
  @Input() todo!: Todo;
  @Output() todoUpdated = new EventEmitter<Todo>();

  constructor(public dialog: MatDialog) {}

  onCheckboxChange() {
    console.log('checkbox')
    this.todo.completed = !this.todo.completed;
    this.todoUpdated.emit(this.todo);
  }

  openDescriptionDialog() {
    this.dialog.open(TodoDetailsComponent, {
      data: {
        title : this.todo.title,
        description: this.todo.description
      }
    });
  }
}

