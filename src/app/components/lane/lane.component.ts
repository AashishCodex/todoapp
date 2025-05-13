import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../models/todo';
import { TodoCardComponent } from '../todo-card/todo-card.component';
import { TodoService } from '../../services/todo.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateTodoModalComponent } from '../create-todo-modal/create-todo-modal.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-lane',
  templateUrl: './lane.component.html',
  styleUrls: ['./lane.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule, // Add MatDialogModule to imports
    TodoCardComponent, // Assuming it\'s used in the template or imports
    DragDropModule // Add DragDropModule to imports
  ],
})
export class LaneComponent {
  @Input()
  todos: Todo[] = [];
  @Input()
  laneName: string = '';
  @Input()
  allLaneDropListIds: string[] = [];
 @Output()
  todoStatusUpdated: EventEmitter<Todo> = new EventEmitter<Todo>();

  constructor(private todoService: TodoService, public dialog: MatDialog) {}

  ngOnInit(): void {
    console.log('Todos received by LaneComponent for lane', this.laneName, ':', this.todos);
  }

  updateTodo(updatedTodo: Todo): void {
    const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
      this.todoService.updateTodo(updatedTodo).subscribe({
        next: (todo) => console.log('Todo updated successfully', todo),
        error: (error) => console.error('Error updating todo', error)
      });
      this.todoStatusUpdated.emit(updatedTodo); // Emit the event
    }
  }

  openCreateTodoModal(): void {
    console.log('Add a card clicked!');
    const dialogRef = this.dialog.open(CreateTodoModalComponent, {
      width: '400px', // Set a width for the modal (adjust as needed)
      data: { /* You can pass data to the modal here, e.g., lane ID */ }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The modal was closed');
      // Handle the result from the modal if needed (e.g., add the new todo)
    });
  }

  drop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // Optional: Update the lane/status of the moved todo in your data model
      const movedTodo = event.container.data[event.currentIndex];
      movedTodo.status = this.laneName; // Assuming laneName corresponds to the status
      this.todoService.updateTodo(movedTodo).subscribe({
        next: (todo) => console.log('Todo status updated successfully', todo),
        error: (error) => console.error('Error updating todo status', error)
      });
    }
  }
}