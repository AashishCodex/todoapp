import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { CreateTodoModalComponent } from '../create-todo-modal/create-todo-modal.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { LaneComponent } from '../lane/lane.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-board', // Corrected selector to app-board
  templateUrl: './board.component.html',
  styleUrls: [
    './board.component.css'],
  imports: [CommonModule,CreateTodoModalComponent,LaneComponent]
 // standalone: true // Consider making this component standalone if not using NgModules // Removed unnecessary comment
})


export class BoardComponent implements OnInit {
  todos: Todo[] = [];
  lanes: string[] = ['Pending', 'In Progress', 'Completed'];
  allLaneDropListIds: string[] = ['Pending', 'In Progress', 'Completed'];

  constructor(private todoService: TodoService, private dialog: MatDialog,) { }
  
  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos(): void {
    this.todoService.getTodos().subscribe((todos: Todo[]) => {
      this.todos = todos;
      console.log(this.todos);
    });
  }

  getTodosByLane(lane: string): Todo[] {
    const filteredTodos = this.todos.filter(todo => todo.status === lane);
    console.log(`Lane: ${lane}, Todos:`, filteredTodos);
    return filteredTodos;
  }

  // getTodosByLane(lane: string) {
  //   return this.todos.filter(todo => todo.lane === lane);
  // }

  openCreateTodoModal(): void {
    const dialogRef = this.dialog.open(CreateTodoModalComponent, {
      width: '400px',
      data: { /* pass data if needed */ }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The create todo modal was closed');
      // Handle result, e.g., add the new todo to your todos array
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.lanes, event.previousIndex, event.currentIndex);
    console.log('Lane dropped:', this.lanes);
  }
}