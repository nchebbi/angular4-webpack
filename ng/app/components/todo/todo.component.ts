import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { ToDo } from '@app/models/todo';

//providers

import { ToDoService } from '@app/services/todo.service' //@app is an alias for .ng/app/ folder configured in tsconfig.json to 
                                                        //be recongnized when building TypeScript and configured in webpack config file 
                                                        //to use it in resolving modules

@Component({
    //moduleId: module.id, //for commonjs or moduleId: __moduleName,  for SystemJS
    selector: 'my-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['todo.component.css']
})
export class ToDoComponent implements OnInit {
    @Input() todo: ToDo;
    constructor(private route: ActivatedRoute,
        private location: Location,private todoService: ToDoService) {
       
    }
    ngOnInit(): void {
        this.route.params
            .switchMap((params: Params) => { 
                console.log('params',params['id']);
               return this.todoService.getToDo(+params['id']);         
            }).subscribe(todo => {
                console.log('todo',todo);
             this.todo=todo;   
            });
    }
    goBack(): void {
        this.location.back();
    }
}