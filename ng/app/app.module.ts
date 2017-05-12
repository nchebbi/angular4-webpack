import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import {HttpModule} from '@angular/http'
//App Components
import { AppComponent } from './app.component';
import {MenuComponent} from './components/menu/menu.component'

import {HomeComponent  } from './components/home/home.component';
import { ToDosComponent } from './components/todos/todos.component';
import { ToDoComponent } from './components/todo/todo.component';
import { SettingsComponent } from './components/settings/settings.component'


import {AppRoutesModule} from './app.routes'

@NgModule({
  imports: [BrowserModule,HttpModule,AppRoutesModule],
  declarations: [AppComponent,MenuComponent,HomeComponent,ToDosComponent,ToDoComponent,SettingsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
