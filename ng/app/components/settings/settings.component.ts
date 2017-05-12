import { Component } from '@angular/core'


@Component({
    //moduleId: module.id, //for commonjs or moduleId: __moduleName,  for SystemJS
    selector: 'my-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['settings.component.css']
})
export class SettingsComponent{
   
    constructor() {}
}