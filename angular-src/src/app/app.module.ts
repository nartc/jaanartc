import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {ServiceWorkerModule} from '@angular/service-worker';

import {environment} from '../environments/environment';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {RegisterComponent} from './components/register/register.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {TodoDetailComponent} from './components/todos/todo-detail/todo-detail.component';
import {TodoFormComponent} from './components/todos/todo-form/todo-form.component';
import {TodosComponent} from './components/todos/todos.component';
import {AuthComponent} from './layouts/auth/auth.component';
import {DefaultComponent} from './layouts/default/default.component';
import {PrimeImportsModule} from './primeng-imports.module';
import {AuthService} from './services/auth.service';
import {AuthenticationService} from './swagger-api/api/authentication.service';
import {TodoService} from './swagger-api/api/todo.service';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
        LoginComponent,
        RegisterComponent,
        TodosComponent,
        TodoFormComponent,
        TodoDetailComponent,
        DefaultComponent,
        AuthComponent,
        SidebarComponent,
        DashboardComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
        PrimeImportsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [AuthService, AuthenticationService, TodoService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
