import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  {path:"login" , component : LoginComponent},
  {path:"register" , component : RegisterComponent},
  {path:"todos" , component : TodosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
