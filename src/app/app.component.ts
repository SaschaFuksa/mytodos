import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from './todo.service';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, FormsModule]
})
export class AppComponent implements OnInit {
  newTodo = '';
  todos: any[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.fetchTodos();
  }

  fetchTodos() {
    this.todoService.getTodos().subscribe(
      data => {
        this.todos = data;
      },
      error => {
        console.error('Error fetching todos:', error);
      }
    );
  }

  createTodo() {
    if (!this.newTodo.trim()) return;
    this.todoService.addTodo(this.newTodo).subscribe(
      () => {
        this.newTodo = '';
        this.fetchTodos();
      },
      error => {
        console.error('Error adding todo:', error);
      }
    );
  }

  toggle(todo: any) {
    this.todoService.toggleTodo(todo.id, !todo.completed).subscribe(
      () => {
        this.fetchTodos();
      },
      error => {
        console.error('Error toggling todo:', error);
      }
    );
  }

  remove(todo: any) {
    this.todoService.deleteTodo(todo.id).subscribe(
      () => {
        this.fetchTodos();
      },
      error => {
        console.error('Error deleting todo:', error);
      }
    );
  }
}
