import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

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
        AppRoutingModule,
        ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
        PrimeImportsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
