import { Routes } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { LaneComponent } from './components/lane/lane.component';

export const routes: Routes = [
  { path: 'board', component: BoardComponent },
  { path: 'todo/:id', component: TodoCardComponent },
  { path: 'lane', component: LaneComponent },
  { path: '', redirectTo: '/board', pathMatch: 'full' }
];
