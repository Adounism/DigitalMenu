import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardSideMenuPageRoutingModule } from './card-side-menu-routing.module';

import { CardSideMenuPage } from './card-side-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardSideMenuPageRoutingModule
  ],
  declarations: [CardSideMenuPage]
})
export class CardSideMenuPageModule {}
