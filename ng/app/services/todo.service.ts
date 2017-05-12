//core libraries
import { Injectable } from '@angular/core'
import { Http } from '@angular/http'


import 'rxjs/add/operator/toPromise';

//models
import { ToDo } from '@app/models/todo' //@app is an alias for .ng/app/ folder configured in tsconfig.json to 
                                         //be recongnized when building TypeScript and configured in webpack config file 
                                        //to use it in resolving modules


@Injectable()
export class ToDoService {
    private todoUrl = "http://localhost:5000/api/todo";
    private ToDos: ToDo[] = [
        { id: 1, name: 'ToDo 1', done: true },
        { id: 2, name: 'ToDo 3', done: false },
        { id: 3, name: 'ToDo 3', done: true },
        { id: 4, name: 'ToDo 4', done: false },
        { id: 5, name: 'ToDo 5', done: false }
    ];
    constructor(private http: Http) { }

    getToDos(): Promise<ToDo[]> {
        // return this.http.get(this.todoUrl).toPromise().then
        return Promise.resolve(this.ToDos)
                        .then(response => {
                            console.log(response);
                            return response as ToDo[];
                        })
                        .catch(this.handleError);
    }

      getToDo(id: number): Promise<ToDo> {
    return this.getToDos()
      .then(result => result.find(todo => todo.id === id));
  }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only

        return Promise.reject(error.message || error);
    }
}


