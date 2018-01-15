import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

declare var M: any;

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {
    @ViewChild('sideNav') sideNav: ElementRef;

    constructor() {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        M.Sidenav.init(this.sideNav.nativeElement);
    }
}
