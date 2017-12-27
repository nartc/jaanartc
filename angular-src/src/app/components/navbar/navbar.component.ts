import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/components/common/menuitem';
import {Router} from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    menuItems: MenuItem[];

    constructor(
        private _router: Router
    ) {
    }

    ngOnInit() {
        this.menuItems = [
            {
                label:  "JAANartc",
                routerLink: ['/'],
                styleClass: "brand-logo"
            }
        ]
    }

    onRegisterClickHandler() {
        this._router.navigate(['/register']);
    }

    onLoginClickHandler() {
        this._router.navigate(['/login']);
    }
}
