import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
 


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: Http ) { }
 
   getTodos() {
       return this.http.get('http://localhost:3000/todos/getTodos')
           .map(res => res.json());
   }
 
   createTodo(todo) {
       return this.http.post('http://localhost:3000/todos/addTodo', todo)
           .map(res => res.json());
   }
 

   deleteTodo(todo) {
       return this.http.get('http://localhost:3000/todos/deleteTodo/' + todo._id);
   }

   updateTodo(todo) {
    return this.http.post('http://localhost:3000/todos/updateTodo/'+todo._id,todo)
    .map(res => res.json());
  }
}
