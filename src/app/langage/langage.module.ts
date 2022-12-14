import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LangagePageRoutingModule } from './langage-routing.module';

import { LangagePage } from './langage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LangagePageRoutingModule
  ],
  declarations: [LangagePage]
})
export class LangagePageModule {}
