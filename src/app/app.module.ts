import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StatusBar } from '@capacitor/status-bar';
import { IonicStorageModule } from '@ionic/storage-angular';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
  HttpClientModule],
  providers: [

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
