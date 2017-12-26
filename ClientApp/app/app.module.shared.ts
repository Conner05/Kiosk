import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { LifegroupsComponent } from './components/lifegroups/lifegroups.component';
import { ContactComponent } from './components/contact/contact.component';
import { UniversityComponent } from './components/university/university.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        LifegroupsComponent,
        ContactComponent,
        UniversityComponent,
        HomeComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'lifegroups', pathMatch: 'full' },
            // { path: 'home', component: HomeComponent },
            { path: 'lifegroups', component: LifegroupsComponent },
            { path: 'university', component: UniversityComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
