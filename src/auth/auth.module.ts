import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//Third-party modules
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

//Shared modules
import { SharedModule } from './shared/shared.module';
import { initializeApp } from 'firebase/app';

export const ROUTES: Routes = [
    {
        path: "auth",
        children: [
            { path: "", pathMatch: 'full', redirectTo: 'login' },
            { path: "login", loadChildren: './login/login.module#LoginModule' },
            { path: "register", loadChildren: './register/register.module#RegisterModule' }
        ]
    }
]

export const FIREBASE_CONFIG: FirebaseAppConfig = {
    apiKey: "AIzaSyBZMSyKlAIx5SrEOD2AJhnnm5z7qUMmDMM",
    authDomain: "fitness-app-8f2a8.firebaseapp.com",
    databaseURL: "https://fitness-app-8f2a8.firebaseio.com",
    projectId: "fitness-app-8f2a8",
    storageBucket: "fitness-app-8f2a8.appspot.com",
    messagingSenderId: "745031033509"
};

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(ROUTES),
        AngularFireModule.initializeApp(FIREBASE_CONFIG),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        SharedModule.forRoute() //Avoids duplicate instance of Auth Service
    ]
})
export class AuthModule {}