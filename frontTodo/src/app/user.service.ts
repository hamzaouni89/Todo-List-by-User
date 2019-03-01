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
export class UserService {


    constructor(private http: Http) { }

    getUsers() {
        return this.http.get('http://localhost:3000/users/getUsers')
            .map(res => res.json());
    }

    createUser(user) {
        return this.http.post('http://localhost:3000/users/register', user)
            .map(res => res.json());
    }
    loginUser(user) {
        return this.http.post('http://localhost:3000/users/login', user)
            .map(res => res.json());
    }


    deleteUser(user) {
        return this.http.get('http://localhost:3000/users/deleteUser/' + user.id);
    }
}
