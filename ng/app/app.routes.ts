
export const AppRoutes = { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {MenuComponent  } from './components/menu/menu.component';
import {HomeComponent  } from './components/home/home.component';
import { ToDosComponent } from './components/todos/todos.component';
import { ToDoComponent } from './components/todo/todo.component';
import { SettingsComponent } from './components/settings/settings.component'



const routes: Routes = [
  //{ path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'todos', component: ToDosComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'todo/:id', component: ToDoComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutesModule { }