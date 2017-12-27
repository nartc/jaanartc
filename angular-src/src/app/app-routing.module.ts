import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TodosComponent } from './components/todos/todos.component';
import { TodoFormComponent } from './components/todos/todo-form/todo-form.component';
import { TodoDetailComponent } from './components/todos/todo-detail/todo-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {title: 'JAANartc | Home'}
      },
      {
        path: 'login',
        component: LoginComponent,
        data: {title: 'JAANartc | Login'}
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {title: 'JAANartc | Register'}
      }
    ]
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: ':id',
        component: DashboardComponent,
        data: {title: 'JAANartc | Dashboard'}
      },
      {
        path: 'todos',
        children: [
          {
            path: '',
            component: TodosComponent,
            data: {title: 'JAANartc | Todos'}
          },
          {
            path: 'add',
            component: TodoFormComponent,
            data: {title: 'JAANartc | Add Todo'}
          },
          {
            path: ':slug',
            component: TodoDetailComponent,
            data: {title: 'JAANartc | Detail'}
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
