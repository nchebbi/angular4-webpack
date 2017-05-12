import { Component,Input} from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import {ToDo} from '../../models/todo';


@Component({
    //moduleId: module.id, //for commonjs or moduleId: __moduleName,  for SystemJS
    selector: 'my-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['todo.component.css']
})
export class ToDoComponent{   
    @Input() todo: ToDo;
    constructor( private route: ActivatedRoute,
    private location: Location  ) {
    console.log('route',route);
    console.log('location',location);
   }
}