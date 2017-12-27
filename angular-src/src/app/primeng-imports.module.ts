import {NgModule} from "@angular/core";
import {MenubarModule} from 'primeng/components/menubar/menubar';
import {SidebarModule} from 'primeng/components/sidebar/sidebar';
import {ButtonModule} from 'primeng/components/button/button';

@NgModule({
    imports: [
        MenubarModule,
        SidebarModule,
        ButtonModule
    ],
    exports: [
        MenubarModule,
        SidebarModule,
        ButtonModule
    ]
})
export class PrimeImportsModule {
}