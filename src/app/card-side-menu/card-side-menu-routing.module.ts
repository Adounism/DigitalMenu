import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardSideMenuPage } from './card-side-menu.page';

const routes: Routes = [
  {
    path: '',
    component: CardSideMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardSideMenuPageRoutingModule {}
