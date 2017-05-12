import { Component } from '@angular/core'


@Component({
    //moduleId: module.id, //for commonjs or moduleId: __moduleName,  for SystemJS
    selector: 'my-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent{
   
    constructor() {}
}