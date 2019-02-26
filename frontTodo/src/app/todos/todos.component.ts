import { Component, OnInit } from '@angular/core';

import { TodoService } from '../todo.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos;
  formTodo: FormGroup;
  formTodoModifer : FormGroup;
  constructor(public todoService: TodoService) {
    this.formTodo = new FormGroup({
      titre: new FormControl(),
      description: new FormControl()
    });
    this.formTodoModifer = new FormGroup({
      titre: new FormControl(),
      description: new FormControl()
    });
   
  }

  ngOnInit() {
    // this.newTodo = { titre: '', description: '' }
    this.getTodos();
  }

  createTodo() {
    console.log(this.formTodo.value)
    this.todoService.createTodo(this.formTodo.value).subscribe((res) => {
      this.getTodos()
    });
  }

  getTodos() {
    this.todoService.getTodos().subscribe((res) => {
      console.log(res)
      this.todos = res;
    })
  }

  deleteTodo(todo) {
    console.log(todo)
    this.todoService.deleteTodo(todo).subscribe(() => {
      return this.getTodos();
    })
  }
  
update (todo) {

  console.log(todo)
  this.formTodoModifer = new FormGroup({
    titre: new FormControl(todo.titre),
    description: new FormControl(todo.description)
  });
}

updateTodo(todo) {

  todo.titre = this.formTodoModifer.controls.titre.value;
  todo.description = this.formTodoModifer.controls.description.value;
  console.log(todo)
  return this.todoService.updateTodo(todo).subscribe((res) => {
    todo=res;
  
  });
}
  




}
