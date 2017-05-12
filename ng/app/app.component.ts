import { Component } from '@angular/core'


//providers

import { ToDoService } from './services/todo.service'

//models
import { ToDo } from './models/todo'


@Component({
    //moduleId: module.id, //for commonjs or moduleId: __moduleName,  for SystemJS
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['app.component.css'],
    providers: [ToDoService]
})
export class AppComponent {
    title = "Nizar";
    constructor() {}
}