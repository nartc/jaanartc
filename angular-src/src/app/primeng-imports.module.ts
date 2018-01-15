import {NgModule} from '@angular/core';
import {MenubarModule} from 'primeng/components/menubar/menubar';
import {SidebarModule} from 'primeng/components/sidebar/sidebar';
import {ButtonModule} from 'primeng/components/button/button';
import {PanelModule} from 'primeng/components/panel/panel';
import {InputTextModule} from 'primeng/components/inputtext/inputtext';

@NgModule({
    imports: [
        MenubarModule,
        SidebarModule,
        ButtonModule,
        PanelModule,
        InputTextModule
    ],
    exports: [
        MenubarModule,
        SidebarModule,
        ButtonModule,
        PanelModule,
        InputTextModule
    ]
})
export class PrimeImportsModule {
}
