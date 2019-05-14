import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getTodos() {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/todos/getTodos', { headers: header })
      .map(res => res);
  }

  createTodo(todo) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post('http://localhost:3000/todos/addTodo', todo, { headers: header })
      .map(res => res);
  }


  deleteTodo(todo) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get('http://localhost:3000/todos/deleteTodo/' + todo._id, { headers: header });
  }

  updateTodo(todo) {
    let header = new HttpHeaders().append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post('http://localhost:3000/todos/updateTodo/' + todo._id, todo, { headers: header })
      .map(res => res);
  }
}
