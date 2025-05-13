import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

export interface TodoDetails {
  title : string
  description: string;
}
@Component({
  selector: 'app-todo-details',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDividerModule],
  templateUrl: './todo-details.component.html',
  styleUrl: './todo-details.component.css'
})
export class TodoDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public todo: TodoDetails,
    public dialogRef: MatDialogRef<TodoDetailsComponent>
  ) {}

  closeDetails(): void {
    this.dialogRef.close();
  }
}
