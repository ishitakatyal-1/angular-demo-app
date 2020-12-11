import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CookieModule } from 'angular2-cookie/core.js'

import { environment } from 'src/environments/environment';
import { Configuration } from 'msal'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { CommonModule } from '@angular/common';
import { MsalModule, MsalInterceptor, MSAL_CONFIG, MSAL_CONFIG_ANGULAR, MsalAngularConfiguration } from '@azure/msal-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http'

const isIE = window.navigator.userAgent.indexOf("MSIE") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoutingModule,
    MsalModule.forRoot({
      auth: {
        clientId: "465d72e3-97f3-4385-899f-de363dd8c88b",
        authority: "https://login.microsoftonline.com/f8cdef31-a31e-4b4a-93e4-5f571e91255a/",
        validateAuthority: true,
        redirectUri: "http://localhost:4200/login",
      },
      cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: isIE,
      },
    },
      {
        popUp: !isIE,
        consentScopes: [
          "user.read",
          "openid",
          "profile",
          // "api://a88bb933-319c-41b5-9f04-eff36d985612/access_as_user"
        ],
        unprotectedResources:
          ["https://www.microsoft.com/en-us/"],
        protectedResourceMap: [
          ['https://graph.microsoft.com/v1.0/me', ['user.read']],
          ['https://api.myapplication.com/users/*', ['customscope.read']]
        ],
        extraQueryParameters: {}
      })
  ],
  providers:
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: MsalInterceptor,
        multi: true
      }
    ],
  bootstrap: [AppComponent]
},
)

export class AppModule { }
