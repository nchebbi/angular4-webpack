import { Component, OnInit} from '@angular/core'

import {ToDo} from '../../models/todo';


//providers

import { ToDoService } from '../../services/todo.service'

@Component({
    //moduleId: module.id, //for commonjs or moduleId: __moduleName,  for SystemJS
    selector: 'my-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['todos.component.scss']
})
export class ToDosComponent implements OnInit{
   
    private ToDos: ToDo[] = [];
    private selectedToDo: ToDo;

    constructor(private todoService: ToDoService) {
            }

    onSelectTodo(todo:ToDo):void
    {
        this.selectedToDo=todo;
        console.log(this.selectedToDo);
    }

        ngOnInit():void {
    
        this.todoService.getToDos()
            .then(todos => this.ToDos = todos);
    }
}