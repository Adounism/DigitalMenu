import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LangagePage } from './langage.page';

const routes: Routes = [
  {
    path: '',
    component: LangagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LangagePageRoutingModule {}
